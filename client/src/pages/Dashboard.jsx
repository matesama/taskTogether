import './dashboard.css'
import Navigation from '../components/Navgiation'
import ChatMenu from '../components/ChatMenu'
import ChatBox from '../components/ChatBox'
import AddComponent from '../components/AddComponent';
import { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {io} from "socket.io-client"


const Dashboard = () => {
	const [currentChat, setCurrentChat] = useState(null);
	const [showAddComponent, setShowAddComponent] = useState(false);
	const {user} = useContext(AuthContext);
	const socket = useRef();

  	useEffect(() => {
    	socket.current = io('ws://localhost:8100');

    	return () => {
    	  if (socket.current) {
    	    socket.current.disconnect();
    	  }
    	};
  	}, []);

	useEffect(() => {
		if(socket.current) {
			socket.current.emit("addUser", user._id);
			socket.current.on("getUsers", users => {
			})
		}
	},[user])

	const handleAddButtonClick = () => {
		setShowAddComponent(true);
		setCurrentChat(null);
	  };

	const handleChatClick = (chat) => {
		setShowAddComponent(false);
		setCurrentChat(chat);
	};

	const handleUserSelect = async (selectedUser) => {
		try {
		  const conversationResponse = await axios.post('http://localhost:8000/api/conversations', {
			senderId: user._id,
			receiverId: selectedUser._id,
		  });

		  socket.current.emit('newConversation');
		} catch (error) {
		  console.error('Error adding contact:', error);
		}
	  };

  return (
  	<>
		<div className='dashboard'>
			<div className="navigation">
				<Navigation currentUser={user} onAddButtonClick={handleAddButtonClick} socket={socket} />
        	</div>
			<div className="chatMenu">
				<ChatMenu currentUser={user} setCurrentChat={handleChatClick} socket={socket}/>
			</div>
			<div className="contentContainer">
          		{showAddComponent ? (
            		<AddComponent currentUser={user} onUserSelect={handleUserSelect} socket={socket}/>
          			) : (
            		<ChatBox currentUser={user} currentChat={currentChat} socket={socket}/>
         		)}
        </div>
		</div>
	</>
  )
}

export default Dashboard;
