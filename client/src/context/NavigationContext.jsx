import { createContext, useRef, useContext } from 'react';
import { UserContext } from './UserContext.jsx';
import { useNavigate } from 'react-router-dom';


export const NavigationContext = createContext({
  handleAdd: () => {},
  handleLogout: () => {},
});

const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const { logout, socket } = useContext(UserContext);

  const handleAdd = () => {
    navigate('/add');
  };

  const handleLogout = () => {
    // socket.emit("logout");
    logout();
  };

  return (
    <NavigationContext.Provider value={{ handleAdd, handleLogout }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;