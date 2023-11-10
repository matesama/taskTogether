import './navigation.css';
import React, { useContext } from 'react';
import { AuthContext, Logout } from '../context/AuthContext';

const Navigation = ({ onAddButtonClick, socket }) => {

  const { dispatch } = useContext(AuthContext);
	const {user} = useContext(AuthContext);



  const handleLogout = () => {
    dispatch(Logout());
    if (socket.current) {
      socket.current.emit("logout");
    };
  };

  return (
    <div className="navigation">
      <div className="userProfile">
        <img
          className="userProfilePicture"
          src={user.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
          alt="User Profile"
        />
        <span className="userName">{user.username}</span>
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