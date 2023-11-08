import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Conversation from './Conversation';
import {io} from "socket.io-client"


export default function ChatMenu({ currentUser, setCurrentChat}) {

	const [conversations, setConversations] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [filteredConversations, setFilteredConversations] = useState([]);
	const socket = useRef();


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
    	socket.current = io("ws://localhost:8100");

    	socket.current.on('newConversation', getConversations);

    	return () => {
    	  socket.current.off('newConversation');
    };
  	}, []);

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