import React, { useRef, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Message from './Message';
import axios from 'axios';
import "./chatBox.css"


const ChatBox = ({ currentChat , socket, allUsers}) => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [receiver, setReceiver] = useState(null)
  	const scrollRef = useRef();
	const {user} = useContext(AuthContext);



	useEffect(() => {
		if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
			setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
		}
	}, [arrivalMessage, currentChat])

	useEffect(() => {
		const getMessages = async () => {
		  	try {
				const res = await axios.get("http://localhost:8000/api/messages/" + currentChat?._id);
				setMessages(res.data);
				// console.log(currentChat);
		  	} catch (err) {
				console.log(err);
		  	} finally {
				//loader
			}
		};
		getMessages();

		if (socket && socket.current) {
			socket.current.on("getMessage", (data) => {
				setArrivalMessage({
					sender: data.senderId,
					text: data.text,
					createdAt: Date.now(),
				  });
			});
		}
		return () => {
			if (socket && socket.current) {
			  socket.current.off("getMessage");
			}
		  };

	}, [currentChat])

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		if (currentChat) {
		  const receiverId = currentChat.members.find(member => member !== user._id);
		  const fetchReceiverData = async () => {
			try {
			  const res = await axios.get(`http://localhost:8000/api/users?userId=${receiverId}`);
			  setReceiver(res.data);
			} catch (err) {
			  console.log(err);
			}
		  }
		  fetchReceiverData();
		}
	  }, [currentChat, user]);

/////////////// HANDLE_SUBMIT ////////////////////////////////////////////////

	const handleSubmit = async (e) =>{
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverIds = currentChat.members.filter(member => member !== user._id);

		if (socket.current) {
			receiverIds.forEach(receiverId => {
				socket.current.emit("sendMessage", {
					senderId: user._id,
					receiverId,
					text: newMessage,
				});
			});
		}

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
			<div className="chatBoxWrapper">
			{currentChat ? (
			  <>
			  	<div className="header">
  					<div className="headerTop">
  					  <img
  					    className="headerImg"
  					    src={
  					      currentChat.groupName
  					        ? (currentChat.groupPicture ? currentChat.groupPicture : "https://user-images.githubusercontent.com/1468166/37978116-46efb0e0-31b3-11e8-8d51-8d7af47d6f1c.png")
  					        : (receiver?.profilePicture ? receiver.profilePicture : "https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg")
  					    }
  					    alt=""
  					  />
  					  <span className="headerName">{currentChat.groupName ? currentChat.groupName : receiver?.username}</span>
  					</div>
  					{currentChat.groupName &&
  					  <span className="chatInfo">
  					    {currentChat.members
						  .filter(memberId => memberId !== user._id)
						  .map(memberId => {
  					      const member = allUsers.find(member => member._id === memberId);
  					      return member ? member.username : '';
  					    }).join(', ')}
  					  </span>
  					}
				</div>
				<div className="chatBoxTop" key={user._id}>
				  {messages.map((m) => (
					<div key={m._id} ref={scrollRef}>
					  <Message message={m} own={m.sender === user._id} />
					</div>
				  ))}
				</div>
				<div className="chatBoxBottom">
					  <textarea
						className="chatMessageInput rounded-2xl"
						placeholder="write something..."
						onChange={(e) => setNewMessage(e.target.value)}
						value={newMessage}
					  ></textarea>
					<button className="chatSubmitButton bg-slate-950 text-slate-100 rounded-md mr-4" onClick={handleSubmit}>
						Send
					</button>
				</div>
			  </>
				) : (
					<div className="flex flex-col h-full justify-center">
						<span className="noConversationText text-slate-950 ">
							Welcome to taskTogether
					  	</span>
						<br/>
					  	<span className="text-slate-950  text-3xl">
						  Join a Group/Join a partner and start setting and achieving your goals
						</span>
					</div>
			)}
			</div>
  	);
};

export default ChatBox;