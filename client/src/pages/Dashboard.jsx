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
	const [conversations, setConversations] = useState([]);
	const [contacts, setContacts] = useState([]);
	const {user} = useContext(AuthContext);
	const socket = useRef();


/////////////// Socket Connection ////////////////////////////////////////////////

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

/////////////// ChatMenu ////////////////////////////////////////////////

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

	useEffect(() => {

		if (socket.current) {
			socket.current.on('newConversation', getConversations);
		}

		return () => {
			if (socket.current) {
				socket.current.off('newConversation');
			}
	};
	  }, [getConversations]);

  useEffect(() => {
	getConversations();
  }, [user._id]);


/////////////// AddComponent ////////////////////////////////////////////////

  const getContacts = async () => {
    try {
      const conversationResponse = await axios.get(`http://localhost:8000/api/conversations/${user._id}`);
      const conversations = conversationResponse.data;

      const participantIds = conversations.reduce((ids, conversation) => {
        return [...ids, ...conversation.members];
      }, []);

      const userResponse = await axios.get('http://localhost:8000/api/users/all');
      const allUsers = userResponse.data;

      const filteredContacts = allUsers.filter((user) => !participantIds.includes(user._id));

      setContacts(filteredContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      //loader
    }
  };

  useEffect(() => {

    socket.current.on('newConversation', getContacts)

    return () => {
      socket.current.off('newConversation');
    };
  }, [getContacts]);

  useEffect(() => {
    getContacts();
  }, [user._id]);

/////////////// Dashboard (Handler) ////////////////////////////////////////////////

	const handleAddButtonClick = () => {
		setShowAddComponent(true);
		setCurrentChat(null);
	  };

	const handleChatClick = (chat) => {
		setShowAddComponent(false);
		setCurrentChat(chat);
	};

	const handleAddUser = async (selectedUser) => {
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
				<ChatMenu currentUser={user} setCurrentChat={handleChatClick} conversations={conversations}/>
			</div>
			<div className="contentContainer">
          		{showAddComponent ? (
            		<AddComponent handleAddUser={handleAddUser} contacts={contacts}/>
          			) : (
            		<ChatBox currentUser={user} currentChat={currentChat} socket={socket}/>
         		)}
        </div>
		</div>
	</>
  )
}

export default Dashboard;
