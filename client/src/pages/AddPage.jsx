import './dashboard.css'
import ChatMenu from '../components/ChatMenu.jsx';
import Navigation from '../components/Navigation.jsx';
import AddComponent from '../components/AddComponent';
import GroupComponent from '../components/GroupComponent';
import { useContext } from 'react';
import { AddContext } from '../context/AddContext';


const AddPage = () => {

	const { showGroupComponent } = useContext(AddContext);

	 return (
		<>
		  <div key="container" className='dashboard'>
		 	<div className="navigation bg-slate-800 max-sm:invisible sm:w-24 max-sm:w-0">
			  <Navigation />
			</div>
			<div key="chatMenu" className="chatMenu bg-slate-500 text-slate-950 max-sm:w-full">
			  <ChatMenu />
			</div>
			<div className="contentContainer bg-slate-300 max-sm:w-0 max-sm:invisible sm:flex-5.5">
				<div className="flex flex-col h-full justify-center">
					{showGroupComponent ? <GroupComponent /> : <AddComponent />}
              	</div>
		 	</div>
		  </div>
	  </>
	)
  }

  export default AddPage;


/////////////// Socket Connection ////////////////////////////////////////////////

  	// useEffect(() => {
    // 	socket.current = io('ws://localhost:8100');

    // 	return () => {
    // 	  if (socket.current) {
    // 	    socket.current.disconnect();
    // 	  }
    // 	};
  	// }, []);

	// useEffect(() => {
	// 	if(socket.current) {
	// 		socket.current.emit("addUser", user._id);
	// 		socket.current.on("getUsers", users => {
	// 		})
	// 	}
	// },[user])

/////////////// ChatMenu ////////////////////////////////////////////////

// 	const getConversations = async () => {
// 		try {
// 			setLoader(!loader);
// 			const res = await axios.get("http://localhost:8000/api/conversations/" + user._id);
// 			setConversations(res.data);
// 		} catch (err){
// 			console.log(err);
// 		} finally {
// 		  setLoader(false);
// 		}
// 	};

// 	useEffect(() => {

// 		if (socket.current) {
// 			socket.current.on('newConversation', getConversations);
// 		}

// 		return () => {
// 			if (socket.current) {
// 				socket.current.off('newConversation');
// 			}
// 	};
// 	  }, [getConversations]);


//   useEffect(() => {
// 	getConversations();
//   }, [user._id]);


/////////////// AddComponent ////////////////////////////////////////////////

// 	const getAllUsers = async () => {
// 	  try {
// 		const userResponse = await axios.get('http://localhost:8000/api/users/all');
// 		setAllUsers(userResponse.data);
// 	  } catch (error) {
// 		console.error('Failed to fetch users:', error);
// 	  }
// 	};

// 	useEffect(() => {
// 		getAllUsers();
// 	}, []);


// 	useEffect(() => {
// 		const getAllOpenGroupConversations = async () => {
// 		  try {
// 			const userResponse = await axios.get('http://localhost:8000/api/conversations/allGroups');
// 			const filteredData = userResponse.data.filter(conversation => !conversation.members.includes(user._id));
// 			// console.log('allGroupConversationsResponse', filteredData);
// 			setAllOpenGroupConversations(filteredData);
// 		  } catch (error) {
// 			console.error('Failed to fetch  conversations:', error);
// 		  }
// 		};

// 		getAllOpenGroupConversations();
// 	}, []);


//   const getContacts = async () => {
//     try {
// 		setLoader(!loader)
//       const conversationResponse = await axios.get(`http://localhost:8000/api/conversations/${user._id}`);
//       const conversations = conversationResponse.data;

// 	  const filteredConversations = conversations.filter(conversation => !conversation.groupName);
//       const participantIds = filteredConversations.reduce((ids, conversation) => {
//         return [...ids, ...conversation.members];
//       }, []);

//       const userResponse = await axios.get('http://localhost:8000/api/users/all');
//       const allUsers = userResponse.data;

//       const filteredContacts = allUsers.filter((user) => !participantIds.includes(user._id));

//       setContacts(filteredContacts);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   useEffect(() => {

//     socket.current.on('newConversation', getContacts)

//     return () => {
//       socket.current.off('newConversation');
//     };
//   }, [getContacts]);

//   useEffect(() => {
//     getContacts();
//   }, [user._id]);

/////////////// Dashboard (Handler) ////////////////////////////////////////////////

	// const handleAddButtonClick = () => {
	// 	setShowAddComponent(true);
	// 	setShowGroupComponent(false);
	// 	setCurrentChat(null);
	//   };

	// const handleChatClick = (chat) => {
	// 	setShowAddComponent(false);
	// 	setShowGroupComponent(false);
	// 	setCurrentChat(chat);
	// };

	// const handleChatClick = (chat) => {
	// 	navigate(`/chat/${chat._id}`);
	// };

	// const handleGroupButtonClick = () => {
	// 	setShowGroupComponent(true);
	// 	setCurrentChat(null);
	// };

	// const handleGroupCreated = () => {
	// 	setShowGroupComponent(false);
	// 	setShowAddComponent(false);
	// 	setCurrentChat(null);
	// };

	// const handleAddUser = async (selectedUser) => {
	// 	try {
	// 	  const conversationResponse = await axios.post('http://localhost:8000/api/conversations', {
	// 		members: [user._id, selectedUser._id],
    //   		groupName: '',
    //   		groupPicture: '',
	// 	  });
	// 	  socket.current.emit('newConversation');
	// 	} catch (error) {
	// 	  console.error('Error adding contact:', error);
	// 	}
	//   };

	//   const handleJoinGroup = async (groupId) => {
	// 	try {
	// 	  const response = await axios.post(`http://localhost:8000/api/conversations/join/${groupId}`, { userId: user._id });
	// 	  setAllOpenGroupConversations(prevConversations => prevConversations.filter(conversation => conversation._id !== groupId));
	// 	  getConversations();
	// 	} catch (error) {
	// 	  console.error('Failed to join group:', error);
	// 	}
	//   };


