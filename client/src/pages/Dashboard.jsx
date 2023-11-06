import './dashboard.css'
import Navigation from '../components/Navgiation'
import ChatMenu from '../components/ChatMenu'
import ChatBox from '../components/ChatBox'
import AddComponent from '../components/AddComponent';
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';



const Chat = () => {
	const [currentChat, setCurrentChat] = useState(null);
	const [showAddComponent, setShowAddComponent] = useState(false);
	const {user} = useContext(AuthContext);

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

		  const newConversation = conversationResponse.data;

		//   const userResponse = await axios.put(`http://localhost:8000/api/users/${user._id}`, {
		// 	userId: user._id,
		// 	contacts: [...user.contacts, selectedUser._id],
		//   });

		//   const updatedUser = userResponse.data;

		//   console.log(`Added ${selectedUser.username} to contacts. Updated user:`, updatedUser);
		  console.log('New Conversation:', newConversation);
		} catch (error) {
		  console.error('Error adding contact:', error);
		}
	  };

  return (
  	<>
		<div className='dashboard'>
			<div className="navigation">
				<Navigation currentUser={user} onAddButtonClick={handleAddButtonClick} />
        	</div>
			<div className="chatMenu">
				<ChatMenu currentUser={user} setCurrentChat={handleChatClick} />
			</div>
			<div className="contentContainer">
          		{showAddComponent ? (
            		<AddComponent currentUser={user} onUserSelect={handleUserSelect}/>
          			) : (
            		<ChatBox currentUser={user} currentChat={currentChat} />
         		)}
        </div>
			{/* <div className="chatBox">
				<ChatBox currentUser={user} currentChat={currentChat}/>
			</div> */}
		</div>
	</>
  )
}

export default Chat;
