import './navigation.css';
import React, { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';
import { UserContext } from '../context/UserContext';
import addButton from "../assets/addButton.svg";
import goalButton from "../assets/goalButton.svg";
import settingsButton from "../assets/settingsButton.svg"
import logoutButton from "../assets/logoutButton.svg"

const Navigation = () => {
  const { handleAdd, handleLogout } = useContext(NavigationContext);
  const { user } = useContext(UserContext);

  return (
    <div className="navigation bg-slate-800 flex items-center">
      <div className="userProfile flex">
        <img
          className="userProfilePicture self-center"
          src={user.profilePicture || 'https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg'}
          alt="User Profile"
        />
        <span className="userName text-slate-300">{user.username}</span>
      </div>
      <div className="navButtons flex">
        <button className="navButton bg-slate-100 text-slate-950 w-12" onClick={handleAdd}>
          <img src={addButton} alt="add Button" className="w-8 h-8"/>
        </button>
        <button className="navButton bg-slate-100 text-slate-950 w-12"> <img src={goalButton} alt="task Button" className="w-8 h-8"/></button>
        <button className="navButton bg-slate-100 text-slate-950 w-12"> <img src={settingsButton} alt="add Button" className="w-8 h-8"/></button>
        <button className="navButton bg-slate-200 text-slate-950 w-12" onClick={handleLogout}>
        <img src={logoutButton} alt="add Button" className="w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};

export default Navigation;