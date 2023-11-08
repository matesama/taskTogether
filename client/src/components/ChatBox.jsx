import React, { useRef, useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';


const ChatBox = ({ currentUser, currentChat , socket}) => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
  	const scrollRef = useRef();


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
		  	} catch (err) {
				console.log(err);
		  	} finally {
				//loader
			}
		};
		getMessages();

		if (socket.current) {
			socket.current.on("getMessage", (data) => {
				setArrivalMessage({
					sender: data.senderId,
					text: data.text,
					createdAt: Date.now(),
				  });
			});
		}
		return () => {
			if (socket.current) {
			  socket.current.off("getMessage");
			}
		  };

	}, [currentChat])

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
		}, [messages]);


/////////////// HANDLE_SUBMIT ////////////////////////////////////////////////

	const handleSubmit = async (e) =>{
		e.preventDefault();
		const message = {
			sender: currentUser._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find(member => member !== currentUser._id);

		if (socket.current) {
			socket.current.emit("sendMessage", {
				senderId: currentUser._id,
				receiverId,
				text: newMessage,
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
				<div className="chatBoxTop">
				  {messages.map((m) => (
					<div key={m._id} ref={scrollRef}>
					  <Message message={m} own={m.sender === currentUser._id} />
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
  	);
};

export default ChatBox;