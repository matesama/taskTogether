import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext, Logout } from '../context/AuthContext';
import axios from 'axios';
import Conversation from './Conversation';
import addButton from "../assets/addButton.svg";
import goalButton from "../assets/goalButton.svg";
import settingsButton from "../assets/settingsButton.svg"
import logoutButton from "../assets/logoutButton.svg"


export default function ChatMenu({ currentUser, setCurrentChat, socket, onAddButtonClick}) {

	const [conversations, setConversations] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [filteredConversations, setFilteredConversations] = useState([]);


	const getConversations = async () => {
		try {
			const res = await axios.get("http://localhost:8000/api/conversations/" + currentUser._id);
			setConversations(res.data);
		} catch (err){
			console.log(err);
		} finally {
		  //loader
		}
	}
/////////////// SOCKET ////////////////////////////////////////////////

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
  	}, [currentUser._id]);


/////////////// CONVERSATIONS ////////////////////////////////////////////////

	useEffect(() => {
		const filterConversations = async () => {
		  const filtered = await Promise.all(
			conversations.map(async (c) => {
			  const contactId = c.members.find((m) => m !== currentUser._id);
			  const username = await getUsername(contactId);
			  return (username && username.toLowerCase().includes(searchInput.toLowerCase()));
			})
		  );
		  setFilteredConversations(conversations.filter((_, index) => filtered[index]));
		};

		filterConversations();
	  }, [searchInput, conversations, currentUser]);

	  const getUsername = async (contactId) => {
		try {
		  const res = await axios(`http://localhost:8000/api/users?userId=${contactId}`);
		  return res.data.username;
		} catch (err) {
		  console.log(err);
		  return null;
		}
	  };


	  const { dispatch } = useContext(AuthContext);

  		const handleLogout = () => {
    		dispatch(Logout());
    		if (socket.current) {
      		socket.current.emit("logout");
    		};
  		};

	  return (
		<div className="chatMenu overscroll-none">
		  <div className=" max-sm:flex max-sm:flex-col max-sm:items-start  max-sm:overscroll-none pt-2 static">
		  
		  <div className="userProfile max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full sm:w-0 sm:invisible sm:h-0">
        	<img
          		className="userProfilePicture"
          		src={currentUser.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
          		alt="User Profile"
        	/>
        	<span className="userName text-slate-950">{currentUser.username}</span>
      	  </div>
	
			<input
			  placeholder="Search for People"
			  className="chatMenuInput rounded-2xl bg-slate-100 max-sm:pl-5 ml-2 placeholder-slate-950 placeholder-opacity-50 placeholder: pl-4 mr-8"
			  value={searchInput}
			  onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
			/>
			{filteredConversations.map((c) => (
			  <div key={c._id} onClick={() => setCurrentChat(c)}>
				<Conversation conversation={c} currentUser={currentUser} />
			  </div>
			))}
			
			<div className="navButtons flex flex-row sm:invisible sm:w-0 sm:h-0  w-full justify-around items-center bg-slate-900 max-sm: h-16 self-end absolute bottom-0">
        <button className="navButton bg-slate-100 text-slate-950 w-12 max-sm:m-0 rounded-full" onClick={onAddButtonClick}>
          <img src={addButton} alt="add Button" className="w-8 h-8"/>
        </button>
        <button className="navButton bg-slate-100 text-slate-950 w-12 max-sm:m-0 rounded-full"> <img src={goalButton} alt="task Button" className="w-8 h-8"/></button>
        <button className="navButton bg-slate-200 text-slate-950 w-12 max-sm:m-0 rounded-full" onClick={handleLogout}>
        <img src={logoutButton} alt="add Button" className="w-8 h-8"/>
        </button>
      </div>
		  </div>
		</div>
	  );
	}