import { createContext, useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from './UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const GroupContext = createContext({
  handleAddUser: () => {},
  handleRemoveUser: () => {},
  handleSubmit: () => {},
});

const GroupProvider = ({ children }) => {
  const { user, socket } = useContext(UserContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupPicture, setGroupPicture] = useState('');
  const [file, setFile] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
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

  //groupCreation
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
      const formData = new FormData();
      formData.append('groupPicture', groupPicture);

      const membersIds = [...selectedUsers.map(selectedUser => selectedUser._id), user._id];

      // Append additional form fields
      membersIds.forEach((memberId, index) => {
        formData.set(`members[${index}]`, memberId);
      });

      formData.append('groupName', groupName);

      const conversationResponse = await axios.post('http://localhost:8000/api/conversations', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // socket.emit('newConversation');
      // console.log('Group created:', conversationResponse.data);
      socket.emit('newConversation');
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
    }
  };



  return (
    <GroupContext.Provider value={{ handleAddUser, handleRemoveUser, handleSubmit, handleBackButton, setGroupName, setGroupPicture, groupPicture, selectedUsers, allUsers, getAllUsers }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;