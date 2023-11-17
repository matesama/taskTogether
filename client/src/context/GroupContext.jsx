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
      formData.append('members', JSON.stringify(membersIds));
      formData.append('groupName', groupName);
      
      const conversationResponse = await axios.post('http://localhost:8000/api/conversations', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
<<<<<<< HEAD

      // socket.emit('newConversation');
      console.log('Group created:', conversationResponse.data);
=======
      socket.emit('newConversation');
      navigate('/');
>>>>>>> 08fbe3a67f7fc592b94cf0dea1af4f9e23d7c523
    } catch (error) {
      console.error(error.response.data);
    }
  };

/*  useEffect(()=>{
    const fetchGroup = async () => {

      try {
        const response = await axios.get('http://localhost:8000/api/conversations', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log(response);

      } catch(err) {
        console.log(err);
      }
    }
    fetchGroup();
  }, [])*/




  return (
    <GroupContext.Provider value={{ handleAddUser, handleRemoveUser, handleSubmit, handleBackButton, setGroupName, setGroupPicture, groupPicture, selectedUsers, allUsers, getAllUsers }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;