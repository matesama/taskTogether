import "./GroupComponent.css";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { GroupContext } from "../context/GroupContext";

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
          <h2>Group Component</h2>
          <div>
            <button className="addButton" onClick={handleBackButton}>Back</button>
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
          <button onClick={handleSubmit}>Create Group</button>
        </div>
      );
}

export default GroupComponent;