import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import "./GroupComponent.css";
import axios from 'axios';

const GroupComponent = ({ allUsers, currentUser, socket, onGroupCreated }) => {

	const [groupName, setGroupName] = useState('');
  	const [groupPicture, setGroupPicture] = useState('');
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [otherUsers, setOtherUsers] = useState([]);



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
		const membersIds = [...selectedUsers.map(user => user._id), currentUser._id];
		const conversationResponse = await axios.post('http://localhost:8000/api/conversations', {
			members: membersIds,
			groupName: groupName,
			groupPicture: groupPicture,
		});
		socket.current.emit('newConversation');
		console.log('Group created:', conversationResponse.data);
		onGroupCreated();
	  } catch (error) {
		console.error('Error creating group:', error);
	  }

  	  console.log('Group name:', groupName);
  	  console.log('Group picture:', groupPicture);
  	};

	const handleAddUser = (user) => {
		setSelectedUsers([...selectedUsers, user]);
	};

	const handleRemoveUser = (userToRemove) => {
		setSelectedUsers(selectedUsers.filter(user => user._id !== userToRemove._id));
	};


	useEffect(() => {
		setOtherUsers(allUsers.filter(user => user._id !== currentUser._id && !selectedUsers.includes(user)));
	}, [allUsers, currentUser, selectedUsers]);


  	return (
  	  <div className="group-component">
  	    <h2>Group Component</h2>
  	    <label>
  	      Group Name:
  	      <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
  	    </label>
  	    <label>
  	      Group Picture:
  	      <input type="text" value={groupPicture} onChange={(e) => setGroupPicture(e.target.value)} />
  	    </label>
		{selectedUsers.length > 0 && (
      		<>
      		  <h3>Selected Users</h3>
      		  <ul>
      		    {selectedUsers.map((user) => (
      		      <li key={user._id}>
      		        <img
      		          className="userProfilePicture"
      		          src={user.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
      		          alt="User Profile"
      		        />
      		        <span className="userName">{user.username}</span>
					<button className="addButton" onClick={() => handleRemoveUser(user)}>Remove</button>
      		      </li>
      		    ))}
      		  </ul>
      		</>
    	)}
    	<h3>Other Users</h3>
		<ul>
        	{otherUsers.map((user) => (
        	  <li key={user._id}>
        	    <img
        	      className="userProfilePicture"
        	      src={user.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
        	      alt="User Profile"
        	    />
        	    <span className="userName">{user.username}</span>
				<button className="addButton" onClick={() => handleAddUser(user)} disabled={selectedUsers.length > 2}>Add</button>
        	  </li>
        	))}
      	</ul>
  	    <button onClick={handleSubmit}>Create Group</button>
  	  </div>
  	);
}

export default GroupComponent;
