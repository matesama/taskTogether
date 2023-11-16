import { createContext, useRef, useContext, useState } from 'react';
import { UserContext } from './UserContext.jsx';
import { useNavigate } from 'react-router-dom';


export const NavigationContext = createContext({
  handleAdd: () => {},
  handleLogout: () => {},
});

const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const { logout, socket } = useContext(UserContext);

  const [visibleMobile, setVisibleMobile] = useState(false)

  const handleAdd = () => {
    setVisibleMobile(true);
    navigate('/add');

  };

  const handleLogout = () => {
    // socket.emit("logout");
    logout();
  };

  return (
    <NavigationContext.Provider value={{ handleAdd, handleLogout, visibleMobile, setVisibleMobile }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;