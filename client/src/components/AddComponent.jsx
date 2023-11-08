import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddComponent = ({ onUserSelect, contacts }) => {


  return (
    <div className="add-component">
      <h2>Add Component</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <img
              className="userProfilePicture"
              src={contact.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
              alt="User Profile"
            />
            <span className="userName">{contact.username}</span>
            <button className="addButton" onClick={() => onUserSelect(contact)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddComponent;
