import "./GroupComponent.css";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { GroupContext } from "../context/GroupContext";
import backButtons from "../assets/backButtons.png"

const GroupComponent = ({ }) => {
    const [availableUsers, setAvailableUser] = useState([]);
    const {user} = useContext(UserContext);
    const { handleAddUser, handleRemoveUser, handleSubmit, handleBackButton, setGroupName, setGroupPicture, selectedUsers, allUsers, getAllUsers } = useContext(GroupContext);

    useEffect(() => {
      getAllUsers();
    }, []);

    useEffect(() => {
        setAvailableUser(allUsers.filter(availableUser => availableUser._id !== user._id && !selectedUsers.includes(availableUser)));
    }, [allUsers, user, selectedUsers]);

      return (
        <div className="group-component">
			<div className='flex  w-full justify-between'>
				<button onClick={handleBackButton}><img src={backButtons} alt="back icon" className='w-6 h-6 ml-3 mb-3 '/></button>
				<h2 className='text-2xl'>Group Component</h2>
				<div></div>
			</div>
          <label>
            Group Name:
            <input type="text" onChange={(e) => setGroupName(e.target.value)} />
          </label>
          <label>
            Group Picture:
            <input type="text" onChange={(e) => setGroupPicture(e.target.value)} />
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
          <button className="bg-slate-950 text-white text-md px-8 py-4 rounded-xl" onClick={handleSubmit}>Create Group</button>
        </div>
      );
}

export default GroupComponent;