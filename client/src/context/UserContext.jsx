import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from 'socket.io-client';
import { ChatMenuContext } from "./ChatMenuContext";


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);

  const { setCurrentChat } = useContext(ChatMenuContext)
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user && !socket) {
      const socket = io('ws://localhost:8000');
      socket.on('connect', () => {
        setIsConnected(true);
        socket.emit("addUser", user._id);
      });
      setSocket(socket);
    }
    return () => {
      if (socket) {
        logout();
      }
    };
  }, [user]);


  const login = async (email, password, setLoader, setErrors, clearErrors) => {

    try {
      setLoader(true);
      const getResponse = await axios.post('http://localhost:8000/api/auth/login', { email, password }, { headers: { 'Content-Type': 'application/json' } });
      const data = getResponse.data;

      const token = data.token;
      const user = data.user;
      if (!token) {
        setErrors(data);
        setTimeout(clearErrors, 2000);
      }
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setToken(token);
      if (token && user && socket) {
          socket.emit("addUser", user._id);
      }
        navigate('/');
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.error);
        setTimeout(clearErrors, 2000);
      } else {
        console.log('An error occurred:', error);
      }
    } finally {
      setLoader(false);
    }
  }



  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
          const response = await axios.get('http://localhost:8000/api/auth/user', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
        logout();
      }
    };
    loadUserData();
  }, [token]);



  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('currentChat');
    setUser(null);
    setToken(null);
    setCurrentChat(null);
    if (socket) {
        socket.emit("logout");
        socket.disconnect();
        setSocket(null);
    }
    navigate('/login');
  }

  return (
    <UserContext.Provider value={{ user, token, login, logout, socket }}>
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider;
;