import axios from 'axios';
import Conversation from './Conversation';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



const ChatMenu = ({ setCurrentChat, conversations}) => {

	const [searchInput, setSearchInput] = useState("");
	const [filteredConversations, setFilteredConversations] = useState([]);
	const {user} = useContext(AuthContext);


/////////////// CONVERSATIONS ////////////////////////////////////////////////

	useEffect(() => {
		const filterConversations = async () => {
		  const filtered = await Promise.all(
			conversations.map(async (c) => {
				const contactId = c.members.find((m) => m !== user._id);
				if (!contactId) {
				  return false;
				}
				const username = await getUsername(contactId);
				return (username && username.toLowerCase().includes(searchInput.toLowerCase()));
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

	  return (
		<div className="chatMenu">
		  <div className="chatMenuWrapper">
			<input
			  placeholder="Search for People"
			  className="chatMenuInput"
			  value={searchInput}
			  onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
			/>
			{filteredConversations.map((c) => (
			  <div key={c._id} onClick={() => setCurrentChat(c)}>
				<Conversation conversation={c} currentUer={user} />
			  </div>
			))}
		  </div>
		</div>
	  );
	}

export default ChatMenu;