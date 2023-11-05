import './chat.css'
import Conversation from '../components/conversations/Conversation'
import Message from '../components/message/Message'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {io} from "socket.io-client"


const Chat = () => {
	const [conversation, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const socket = useRef();
	const scrollRef = useRef();
	const {user} = useContext(AuthContext);

/////////////// SOCKET ////////////////////////////////////////////////

	useEffect(() => {
		socket.current = io("ws://localhost:8100");
	}, []);

	useEffect(() => {
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			  });
		})
	}, [])

	useEffect(() => {
		if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
			setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
		}
	}, [arrivalMessage, currentChat])


	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", users => {
			console.log(users);
		})
	},[user])

/////////////// CHAT ////////////////////////////////////////////////

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get("http://localhost:8000/api/conversations/" + user._id);
				setConversations(res.data);
			} catch (err){
				console.log(err);
			} finally {
            	//loader
        	}
		};
		getConversations();

	}, [user._id]);

	// console.log(user._id);

	useEffect(() => {
		const getMessages = async () => {
		  	try {
				const res = await axios.get("http://localhost:8000/api/messages/" + currentChat?._id);
				setMessages(res.data);
		  	} catch (err) {
				console.log(err);
		  	} finally {
				//loader
			}
		};
		getMessages();

	}, [currentChat]);

	//   console.log(currentChat);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
		}, [messages]);

/////////////// HANDLE_SUBMIT ////////////////////////////////////////////////

	const handleSubmit = async (e) =>{
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find(member => member !== user._id);

		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessage,
		})

		try {
			const res = await axios.post("http://localhost:8000/api/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		} finally {
			//loader
		}
	}


  return (
  	<>
		<div className='chat'>
			<div className="chatMenu">
				<div className="chatMenuWrapper">
					<input placeholder='Search for People' className='chatMenuInput' />
					{conversation.map((c) => (
						<div onClick={() => setCurrentChat(c)}>
							<Conversation conversation={c} currentUser={user} />
						</div>
					))}
				</div>
			</div>
			<div className="chatBox">
				<div className="chatBoxWrapper">
				{currentChat ? (
    	          <>
    	            <div className="chatBoxTop">
    	              {messages.map((m) => (
    	                <div ref={scrollRef}>
    	                  <Message message={m} own={m.sender === user._id} />
    	                </div>
    	              ))}
    	            </div>
    	            <div className="chatBoxBottom">
    	              	<textarea
    	              	  className="chatMessageInput"
    	              	  placeholder="write something..."
							onChange={(e) => setNewMessage(e.target.value)}
							value={newMessage}
    	              	></textarea>
    	            	<button className="chatSubmitButton" onClick={handleSubmit}>
							Send
						</button>
    	            </div>
    	          </>
					) : (
						<span className="noConversationText">
    	            		Open a conversation to start a chat.
    	          		</span>
    	        )}
				</div>
			</div>
		</div>
	</>
  )
}

export default Chat;
