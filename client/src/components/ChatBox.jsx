import React, { useContext, useRef, useEffect } from 'react';
import Message from './Message';
import "./chatBox.css"
import { ChatBoxContext } from '../context/ChatBoxContext';
import { UserContext } from '../context/UserContext';
import { ChatMenuContext } from '../context/ChatMenuContext';


const ChatBox = ({}) => {
  const { user, socket } = useContext(UserContext);
  const { handleChatClick, currentChat, conversations, getConversations, loader, setLoader } = useContext(ChatMenuContext);
  const { allUsers, getAllUsers, newMessage, setNewMessage, messages, setMessages, arrivalMessage, setArrivalMessage, receiver,  handleSubmit,  getReceiverData, getMessages } = useContext(ChatBoxContext);
  const scrollRef = useRef();


	useEffect(() => {
		getMessages();
		if (socket) {
			socket.on("getMessage", (data) => {
				setArrivalMessage({
					sender: data.senderId,
					text: data.text,
					createdAt: Date.now(),
				  });
			});
		}
		return () => {
			if (socket) {
			  socket.off("getMessage");
			}
		  };
	}, [currentChat]);

	useEffect(() => {
		getAllUsers();
	}, [])

 	useEffect(() => {
		getReceiverData();
	}, [currentChat, user]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

	useEffect(() => {
		if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
			setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
		}
	}, [arrivalMessage, currentChat])


  useEffect(() => {

		if (socket) {
			socket.on('newConversation', getConversations);
		}

		return () => {
			if (socket) {
				socket.off('newConversation');
			}
	};
	  }, [getConversations]);


	return (
        <div className="chatBoxWrapper">
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
  					    { currentChat.members
						  .filter(memberId => memberId !== user._id)
						  .map(memberId => {
  					      const member = allUsers.find(member => member._id === memberId);
  					      return member ? member.username : '';
  					    }).join(', ')}
  					  </span>
  					}
				</div>
				<div className="chatBoxTop" key={user._id}>
				  {messages && messages.map((m) => (
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
        </div>
    );
};

export default ChatBox;