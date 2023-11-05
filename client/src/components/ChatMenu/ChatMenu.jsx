import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Conversation from '../conversations/Conversation';


export default function ChatMenu({ conversations, currentUser, setCurrentChat}) {

	const [searchInput, setSearchInput] = useState("");
	const [filteredConversations, setFilteredConversations] = useState(conversations);

	useEffect(() => {
		const filterConversations = async () => {
		  const filtered = await Promise.all(
			conversations.map(async (c) => {
			  const contactId = c.members.find((m) => m !== currentUser._id);
			  const username = await getUserUsername(contactId);
			  return (username && username.toLowerCase().includes(searchInput.toLowerCase()));
			})
		  );
		  setFilteredConversations(conversations.filter((_, index) => filtered[index]));
		};

		filterConversations();
	  }, [searchInput, conversations, currentUser]);

	  const getUserUsername = async (contactId) => {
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
				<Conversation conversation={c} currentUser={currentUser} />
			  </div>
			))}
		  </div>
		</div>
	  );
	}