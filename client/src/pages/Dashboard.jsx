import './dashboard.css'
import Navigation from '../components/Navgiation'
import ChatMenu from '../components/ChatMenu'
import ChatBox from '../components/ChatBox'
import AddComponent from '../components/AddComponent';
import { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {io} from "socket.io-client"
import GroupComponent from '../components/GroupComponent';


const Dashboard = () => {
	const [currentChat, setCurrentChat] = useState(null);
	const [showAddComponent, setShowAddComponent] = useState(false);
	const [showGroupComponent, setshowGroupComponent] = useState(false);
	const [conversations, setConversations] = useState([]);
	const [allOpenGroupConversations, setAllOpenGroupConversations] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
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

	const getAllUsers = async () => {
	  try {
		const userResponse = await axios.get('http://localhost:8000/api/users/all');
		setAllUsers(userResponse.data);
	  } catch (error) {
		console.error('Failed to fetch users:', error);
	  }
	};

	useEffect(() => {
		getAllUsers();
	}, []);


	useEffect(() => {
		const getAllOpenGroupConversations = async () => {
		  try {
			const userResponse = await axios.get('http://localhost:8000/api/conversations/allGroups');
			const filteredData = userResponse.data.filter(conversation => !conversation.members.includes(user._id));
			// console.log('allGroupConversationsResponse', filteredData);
			setAllOpenGroupConversations(filteredData);
		  } catch (error) {
			console.error('Failed to fetch  conversations:', error);
		  }
		};

		getAllOpenGroupConversations();
	}, []);


  const getContacts = async () => {
    try {
      const conversationResponse = await axios.get(`http://localhost:8000/api/conversations/${user._id}`);
      const conversations = conversationResponse.data;

	  const filteredConversations = conversations.filter(conversation => !conversation.groupName);
      const participantIds = filteredConversations.reduce((ids, conversation) => {
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
		setshowGroupComponent(false);
		setCurrentChat(null);
	  };

	const handleChatClick = (chat) => {
		setShowAddComponent(false);
		setshowGroupComponent(false);
		setCurrentChat(chat);
	};

	const handleGroupButtonClick = () => {
		setshowGroupComponent(true);
		setCurrentChat(null);
	};

	const handleGroupCreated = () => {
		setshowGroupComponent(false);
		setShowAddComponent(false);
		setCurrentChat(null);
	};

	const handleAddUser = async (selectedUser) => {
		try {
		  const conversationResponse = await axios.post('http://localhost:8000/api/conversations', {
			members: [user._id, selectedUser._id],
      		groupName: '',
      		groupPicture: '',
		  });
		  socket.current.emit('newConversation');
		} catch (error) {
		  console.error('Error adding contact:', error);
		}
	  };

	  const handleJoinGroup = async (groupId) => {
		try {
		  const response = await axios.post(`http://localhost:8000/api/conversations/join/${groupId}`, { userId: user._id });
		  setAllOpenGroupConversations(prevConversations => prevConversations.filter(conversation => conversation._id !== groupId));
		  getConversations();
		} catch (error) {
		  console.error('Failed to join group:', error);
		}
	  };

  return (
  	<>
		<div className='dashboard'>
			<div className="navigation">
				<Navigation onAddButtonClick={handleAddButtonClick} socket={socket} />
        	</div>
			<div className="chatMenu">
				<ChatMenu setCurrentChat={handleChatClick} conversations={conversations}/>
			</div>
			<div className="contentContainer">
				{showGroupComponent ? (
					<GroupComponent
						allUsers={allUsers}
						socket={socket}
						onGroupCreated={handleGroupCreated} />
          		) : showAddComponent ? (
            		<AddComponent
						handleAddUser={handleAddUser}
						handleJoinGroup={handleJoinGroup}
						contacts={contacts}
						handleGroup={handleGroupButtonClick}
						allOpenGroupConversations={allOpenGroupConversations}/>
          		) : (
            		<ChatBox
					currentChat={currentChat}
					socket={socket}
					allUsers={allUsers}/>
         		)}
        </div>
		</div>
	</>
  )
}

export default Dashboard;
