import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from './UserContext.jsx';
import { useNavigate } from 'react-router-dom';
// import { SocketContext } from './SocketContext.jsx';
import axios from 'axios';
import { io } from "socket.io-client";

export const AddContext = createContext();

const AddProvider = ({ children }) => {
  const { user, socket } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [showGroupComponent, setShowGroupComponent] = useState(false);
  const [allOpenGroupConversations, setAllOpenGroupConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [visibleMobile, setVisibleMobile] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      getContacts();
      getAllOpenGroupConversations();
    }

    const listener = () => {
      getContacts();
      getAllOpenGroupConversations();
    };

    if (socket) {
      socket.on('newConversation', listener);

      return () => {
        socket.off('newConversation', listener);
      };
    }
  }, [user, socket]);

  const handleAddUser = async (selectedUser) => {
    try {
      const conversationResponse = await axios.post('http://localhost:8000/api/conversations', {
        members: [user._id, selectedUser._id],
        groupName: '',
        groupPicture: '',
      });
      socket.emit('newConversation');
      getContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/conversations/join/${groupId}`, { userId: user._id });
      setAllOpenGroupConversations(prevConversations => prevConversations.filter(conversation => conversation._id !== groupId));
      socket.emit('newConversation');
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  const handleGroupButtonClick = () => {
      setVisibleMobile(true);
      navigate('/group');
  };

  const handleBackButton = () => {
    navigate('/');
  };

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
        const filteredContacts = allUsers.filter((userItem) => !participantIds.includes(userItem._id) && userItem._id !== user._id);
        setContacts(filteredContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
  };

  const getAllUsers = async () => {
    try {
      const userResponse = await axios.get('http://localhost:8000/api/users/all');
      setAllUsers(userResponse.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const getAllOpenGroupConversations = async () => {
    if (user) {
      try {
        const userResponse = await axios.get('http://localhost:8000/api/conversations/allGroups');
        const filteredData = userResponse.data.filter(conversation => !conversation.members.includes(user._id));
        setAllOpenGroupConversations(filteredData);
      } catch (error) {
        console.error('Failed to fetch  conversations:', error);
      }
    }
  };


  return (
    <AddContext.Provider value={{ handleAddUser, handleJoinGroup, handleBackButton, contacts, handleGroupButtonClick, getAllOpenGroupConversations, allOpenGroupConversations, getAllUsers, showGroupComponent, getContacts, visibleMobile, setVisibleMobile }}>
      {children}
    </AddContext.Provider>
  );
};

export default AddProvider;