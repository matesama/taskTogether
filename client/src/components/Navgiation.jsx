import './navigation.css';
import React, { useContext } from 'react';
import { AuthContext, Logout } from '../context/AuthContext';

const Navigation = ({ currentUser, onAddButtonClick }) => {

  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <div className="navigation">
      <div className="userProfile">
        <img
          className="userProfilePicture"
          src={currentUser.profilePicture || 'default-profile-picture.jpg'}
          alt="User Profile"
        />
        <span className="userName">{currentUser.username}</span>
      </div>
      <div className="navButtons">
        <button className="navButton" onClick={onAddButtonClick}>
          Add
        </button>
        <button className="navButton">Set Task</button>
        <button className="navButton">Settings</button>
        <button className="navButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navigation;