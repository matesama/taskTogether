import './navigation.css';
import React, { useContext } from 'react';
import { AuthContext, Logout } from '../../context/AuthContext';

const Navigation = ({ currentUser }) => {

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
        <button className="navButton">Button 1</button>
        <button className="navButton">Button 2</button>
        <button className="navButton">Button 3</button>
        <button className="navButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navigation;