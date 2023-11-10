
const AddComponent = ({ handleAddUser, handleJoinGroup, contacts, handleGroup, allOpenGroupConversations }) => {

  return (
    <div className="add-component">
      <h2>Add Component</h2>
      <button className="addButton" onClick={handleGroup}>Create Group</button>
      {allOpenGroupConversations.length > 0 ? (
        <div>
          <h3>Groups</h3>
          <ul>
            {allOpenGroupConversations.map((conversation) => (
              <li key={conversation._id}>
                <img
                  className="groupPicture"
                  src={conversation.groupPicture || 'https://user-images.githubusercontent.com/1468166/37978116-46efb0e0-31b3-11e8-8d51-8d7af47d6f1c.png'}
                  alt="Group Profile"
                />
                <span className="groupName">{conversation.groupName}</span>
                <button className="addButton" onClick={() => handleJoinGroup(conversation._id)}>Join Group</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No Groups available, let's create one!</p>
      )}

      {contacts.length > 0 ? (
        <div>
          <h3>Users</h3>
          <ul>
            {contacts.map((contact) => (
              <li key={contact._id}>
                <img
                  className="userProfilePicture"
                  src={contact.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
                  alt="User Profile"
                />
                <span className="userName">{contact.username}</span>
                <button className="addButton" onClick={() => handleAddUser(contact)}>Add</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Unfortunatly no users left!</p>
      )}
    </div>
  );
};

export default AddComponent;
