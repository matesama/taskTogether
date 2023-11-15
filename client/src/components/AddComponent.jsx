import React, { useContext, useEffect } from 'react';
import { AddContext } from '../context/AddContext';
import { UserContext } from '../context/UserContext';
import { NavigationContext } from '../context/NavigationContext';
import backButtons from '../assets/backButtons.png'

const AddComponent = () => {
  const { user } = useContext(UserContext);
  const { getAllUsers, handleAddUser, handleJoinGroup, handleBackButton, contacts, handleGroupButtonClick, getAllOpenGroupConversations, allOpenGroupConversations, getContacts } = useContext(AddContext);
  const {setVisibleMobile} = useContext(NavigationContext);
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getContacts();
  }, [user._id]);

  useEffect(() => {
    getAllOpenGroupConversations();
  }, []);


  return (
    <div className="add-component">
      <div className='flex  w-full justify-between'>
      <button onClick={handleBackButton}><img src={backButtons} alt="back icon" className='w-6 h-6 ml-3 mb-3 sm:w-0 sm:h-0 sm:mr-0 sm:mb-0'/></button>
      <h2>Add Component</h2>
      <div></div>
      </div>

      <button className="addButton" onClick={handleGroupButtonClick}>Create Group</button>
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
          <h3 className="text-4xl mb-10">Add A New Contact/Group</h3>
          <ul>
            {contacts.map((contact) => (
              <li key={contact._id}>
                <img
                  className="userProfilePicture"
                  src={contact.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
                  alt="User Profile"
                />
                <span className="userName text-slate-950">{contact.username}</span>
                <button className="addButton rounded-lg bg-slate-950 text-white" onClick={() => handleAddUser(contact)}>Add</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Unfortunately no users left!</p>
      )}
    </div>
  );
};

export default AddComponent;