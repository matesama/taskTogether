import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const AddComponent = ({ currentUser, onUserSelect }) => {
  const [contacts, setContacts] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8100");

    socket.current.on('newConversation', () => {
      getContacts();
    });

    return () => {
      socket.current.off('newConversation');
    };
  }, []);

  const getContacts = async () => {
    try {
      const conversationResponse = await axios.get(`http://localhost:8000/api/conversations/${currentUser._id}`);
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
    getContacts();
  }, [currentUser._id]);

  return (
    <div className="add-component">
      <h2>Add Component</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <img
              className="userProfilePicture"
              src={contact.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
              alt="User Profile"
            />
            <span className="userName">{contact.username}</span>
            <button className="addButton" onClick={() => onUserSelect(contact)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddComponent;