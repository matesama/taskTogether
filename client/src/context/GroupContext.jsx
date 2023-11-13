import { createContext, useState, useContext, useRef } from 'react';
import { UserContext } from './UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const GroupContext = createContext({
  handleAddUser: () => {},
  handleRemoveUser: () => {},
  handleSubmit: () => {},
});

const GroupProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  // const { socket } = useContext(SocketContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupPicture, setGroupPicture] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  // const socket = useRef();

  const getAllUsers = async () => {
    try {
      const userResponse = await axios.get('http://localhost:8000/api/users/all');
      setAllUsers(userResponse.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleAddUser = (selectedUser) => {
    setSelectedUsers([...selectedUsers, selectedUser]);
  };

  const handleRemoveUser = (userToRemove) => {
    setSelectedUsers(selectedUsers.filter(user => user._id !== userToRemove._id));
  };

  const handleBackButton = () => {
    navigate('/add');
  };

  const handleSubmit = async () => {
    if (selectedUsers.length < 1) {
      alert('Please select at least 1 user.');
      return;
    }
    if (groupName === '') {
      alert('Groupname input must be filled out');
      return;
    }
    try {
      const membersIds = [...selectedUsers.map(selectedUser => selectedUser._id), user._id];
      const conversationResponse = await axios.post('http://localhost:8000/api/conversations', {
        members: membersIds,
        groupName: groupName,
        groupPicture: groupPicture,
      });
      // socket.emit('newConversation');
      console.log('Group created:', conversationResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GroupContext.Provider value={{ handleAddUser, handleRemoveUser, handleSubmit, handleBackButton, setGroupName, setGroupPicture, selectedUsers, allUsers, getAllUsers }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;