import React, { useRef, useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import "./chatBox.css"


const ChatBox = ({ currentUser, currentChat , socket, allUsers}) => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [receiver, setReceiver] = useState(null)
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
				// console.log(currentChat);
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

	useEffect(() => {
		if (currentChat) {
		  const receiverId = currentChat.members.find(member => member !== currentUser._id);
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
	  }, [currentChat, currentUser]);

/////////////// HANDLE_SUBMIT ////////////////////////////////////////////////

	const handleSubmit = async (e) =>{
		e.preventDefault();
		const message = {
			sender: currentUser._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverIds = currentChat.members.filter(member => member !== currentUser._id);

		if (socket.current) {
			receiverIds.forEach(receiverId => {
				socket.current.emit("sendMessage", {
					senderId: currentUser._id,
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
  					    {currentChat.members.map(memberId => {
  					      const user = allUsers.find(user => user._id === memberId);
  					      return user ? user.username : '';
  					    }).join(', ')}
  					  </span>
  					}
				</div>
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