import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from './UserContext.jsx';
import { ChatMenuContext } from './ChatMenuContext.jsx';
import axios from 'axios';


export const ChatBoxContext = createContext({
  allUsers: [],
  setAllUsers: () => {},
  newMessage: "",
  setNewMessage: () => {},
  messages: [],
  setMessages: () => {},
  arrivalMessage: null,
  setArrivalMessage: () => {},
  receiver: null,
  setReceiver: () => {},
  loader: false,
  setLoader: () => {},
  handleSubmit: () => {},
});

const ChatBoxProvider = ({ children }) => {
  const {currentChat, loader, setLoader } = useContext(ChatMenuContext);
  const {user, socket} = useContext(UserContext);

  const [allUsers, setAllUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [receiver, setReceiver] = useState(null);


    const getReceiverData = async () => {
      if (currentChat) {
        const receiverId = currentChat.members.find(member => member !== user._id);
        try {
          const res = await axios.get(`http://localhost:8000/api/users?userId=${receiverId}`);
          setReceiver(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };


	const getMessages = async () => {
		if (currentChat) {
			try {
				setLoader(!loader);
				const res = await axios.get("http://localhost:8000/api/messages/" + currentChat?._id);
				setMessages(res.data);
			  } catch (err) {
				console.log(err);
			  } finally {
				setLoader(false);
			}
		}
	}

	const getAllUsers = async () => {
		try {
		  const userResponse = await axios.get('http://localhost:8000/api/users/all');
		  setAllUsers(userResponse.data);
		} catch (error) {
		  console.error('Failed to fetch users:', error);
		}
	  };



	const handleSubmit = async (e) =>{
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverIds = currentChat.members.filter(member => member !== user._id);

		if (socket) {
			receiverIds.forEach(receiverId => {
				socket.emit("sendMessage", {
					senderId: user._id,
					receiverId,
					text: newMessage,
				});
			});
		}

		try {
			setLoader(!loader);
			const res = await axios.post("http://localhost:8000/api/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		} finally {
			setLoader(false);
		}
	}

//   const getChat = async () => {
// 	try {
// 	  const res = await axios.get(`http://localhost:8000/api/conversations/find/${id}`);
// 	  setCurrentChat(res.data);
// 	} catch (err) {
// 	  console.log(err);
// 	}
//   };

  return (
    <ChatBoxContext.Provider value={{ allUsers, getAllUsers, newMessage, setNewMessage, messages, setMessages, arrivalMessage, setArrivalMessage, receiver, setReceiver, loader, setLoader, handleSubmit, getReceiverData, getMessages }}>
      {children}
    </ChatBoxContext.Provider>
  );
};

export default ChatBoxProvider;
