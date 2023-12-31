import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import { ChatMenuContext } from '../context/ChatMenuContext';
import { NavigationContext } from '../context/NavigationContext';
import axios from 'axios';
import Conversation from './Conversation';
import './chatmenu.css';
import addButton from '../assets/addButton.svg'
import goalButton from '../assets/goalButton.svg'
import logoutButton from '../assets/logoutButton.svg'; 

const ChatMenu = ({ }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  const { user } = useContext(UserContext);
  const { handleChatClick, currentChat, conversations, getConversations, loader, setLoader } = useContext(ChatMenuContext);
  const { handleAdd, handleLogout } = useContext(NavigationContext);


/////////////// CONVERSATIONS ////////////////////////////////////////////////


	useEffect(() => {
   	 	getConversations();
  	}, [user._id]);

	useEffect(() => {
		const filterConversations = async () => {
		  const filtered = await Promise.all(
			conversations.map(async (c) => {
				if (c.groupName) {
					return c.groupName.toLowerCase().includes(searchInput.toLowerCase());
				} else {
				const contactId = c.members.find((m) => m !== user._id);
				if (!contactId) {
				  return false;
				}
				const username = await getUsername(contactId);
				return (username && username.toLowerCase().includes(searchInput.toLowerCase()));
				}
			})
		  );
		  setFilteredConversations(conversations.filter((_, index) => filtered[index]));
		};

		filterConversations();
	  }, [searchInput, conversations, user]);

	const getUsername = async (contactId) => {
		try {
		  	const res = await axios(`http://localhost:8000/api/users?userId=${contactId}`);
		  	return res.data.username;
		} catch (err) {
		  	console.log(err);
		return null;
		}
	};

	//Mobile View
	const chatMenuSizeClass = 'max-sm:w-0 max-sm:h-0 chatMenu overscroll-none';
	const handleMobileChatView = () => {

	}


	const [windowWidth, setWindowWith] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWith(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};

	}, [])




	  return (
		// <div className="chatMenu overscroll-none">
		<div className="chatMenu sm:overflow-y-scroll">
		  <div className=" max-sm:flex max-sm:flex-col max-sm:items-start  max-sm:overscroll-none pt-2 static">

		  <div className="userProfile max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full sm:w-0 sm:invisible sm:h-0">
        	<img
          		className="userProfilePicture"
          		src={user.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
          		alt="User Profile"
        	/>
        	<span className="userName text-slate-950">{user.username}</span>
      	  </div>
			<input
			  placeholder="Search for People"
			  className="chatMenuInput rounded-2xl bg-slate-100 max-sm:pl-5 ml-2 placeholder-slate-950 placeholder-opacity-50 placeholder: pl-4 mr-8"
			  value={searchInput}
			  onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
			/>
			<div className="conversationsList">
			{filteredConversations.map((c) => (
				<div key={c._id} onClick={() => {handleChatClick(c);}}>
				<Conversation conversation={c} currentUser={user} />
			  </div>
			))}
			</div>
			{windowWidth <= 640 ?
			<div className="navButtons flex flex-row sm:invisible sm:w-0 sm:h-0  w-full justify-around items-center bg-slate-900 max-sm: h-16 self-end absolute bottom-0">
				<button className="navButton bg-slate-100 text-slate-950 w-12 max-sm:m-0 rounded-full" onClick={handleAdd}>
					<img src={addButton} alt="add Button" className="w-8 h-8"/>
				</button>
				<button className="navButton bg-slate-100 text-slate-950 w-12 max-sm:m-0 rounded-full">
					<img src={goalButton} alt="task Button" className="w-8 h-8"/>
				</button>
				<button className="navButton bg-slate-200 text-slate-950 w-12 max-sm:m-0 rounded-full" onClick={handleLogout}>
					<img src={logoutButton} alt="add Button" className="w-8 h-8"/>
				</button> 
			</div>
			: null}
		  </div>
		</div>
	  );
	}

export default ChatMenu;