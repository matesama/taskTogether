import "./GroupComponent.css";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../context/UserContext";

const GroupComponent = ({ allUsers, socket, onGroupCreated }) => {

	const [groupName, setGroupName] = useState('');
  	const [groupPicture, setGroupPicture] = useState('');
	const [selectedUsers, setSelectedUser] = useState([]);
	const [availableUsers, setAvailableUser] = useState([]);
	const {user} = useContext(UserContext);

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
		socket.current.emit('newConversation');
		console.log('Group created:', conversationResponse.data);
		onGroupCreated();
	  } catch (error) {
		console.error('Error creating group:', error);
	  }

  	  console.log('Group name:', groupName);
  	  console.log('Group picture:', groupPicture);
  	};

	const handleAddUser = (selectedUser) => {
		setSelectedUser([...selectedUsers, selectedUser]);
	};

	const handleRemoveUser = (userToRemove) => {
		setSelectedUser(selectedUsers.filter(selecteduser => selecteduser._id !== userToRemove._id));
	};


	useEffect(() => {
		setAvailableUser(allUsers.filter(availableUser => availableUser._id !== user._id && !selectedUsers.includes(availableUser)));
	}, [allUsers, user, selectedUsers]);


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
    	<h3>Available Users</h3>
		<ul>
        	{availableUsers.map((availableUser) => (
        	  <li key={availableUser._id}>
        	    <img
        	      className="userProfilePicture"
        	      src={availableUser.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
        	      alt="User Profile"
        	    />
        	    <span className="userName">{availableUser.username}</span>
				<button className="addButton" onClick={() => handleAddUser(availableUser)} disabled={selectedUsers.length > 2}>Add</button>
        	  </li>
        	))}
      	</ul>
  	    <button onClick={handleSubmit}>Create Group</button>
  	  </div>
  	);
}

export default GroupComponent;
