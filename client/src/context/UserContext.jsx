import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from 'socket.io-client';


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  // Init user state
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
  // Init state for token from sessionStorage
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);

  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    if (user && !socket) {
      const newSocket = io('ws://localhost:8100');
      newSocket.on('connect', () => setIsConnected(true));
      setSocket(newSocket);
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);


  useEffect(() => {
    if (socket && user) {
      socket.emit("addUser", user._id);
    }
  }, [socket, user]);


  useEffect(() => {
    const loadUserData = async () => {
      try {
        // check token in sessionStorage
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
          const response = await axios.get('http://localhost:8000/api/auth/user', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          });
          // set User Data on successful response
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
        logout();
      }
    };
    loadUserData();
  }, [token]);

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
      console.log('token', token);
      console.log('user', user);
      // if (token) {
      //   if (socket && user) {
      //     socket.emit("addUser", user._id);
      //     } else {
      //       console.error('Socket is not initialized');
      //     }
      //   navigate('/');
      // }
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

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('currentChat');
    setUser(null);
    setToken(null);
    if (socket) {
        socket.emit("logout");
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