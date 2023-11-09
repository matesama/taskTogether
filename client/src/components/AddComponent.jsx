
const AddComponent = ({ handleAddUser, contacts, handleGroup }) => {


  return (
    <div className="add-component">
      <h2>Add Component</h2>
      <button className="addButton" onClick={handleGroup}>Create Group</button>
      {/* <h3>Groups</h3>
      <ul>
        {allGroupConversations.map((conversation) => (
          <li key={conversation._id}>
            <img
              className="groupPicture"
              src={conversation.groupPicture || 'https://user-images.githubusercontent.com/1468166/37978116-46efb0e0-31b3-11e8-8d51-8d7af47d6f1c.png'}
              alt="Group Profile"
            />
            <span className="groupName">{conversation.groupName}</span>
          </li>
        ))}
      </ul> */}
      <h3>User</h3>
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
  );
};

export default AddComponent;
