import { createContext, useRef, useContext } from 'react';
import { UserContext } from './UserContext.jsx';
import { useNavigate } from 'react-router-dom';


export const NavigationContext = createContext({
  handleAdd: () => {},
  handleLogout: () => {},
});

const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleAdd = () => {
    navigate('/add');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <NavigationContext.Provider value={{ handleAdd, handleLogout }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;