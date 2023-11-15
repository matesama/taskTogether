import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext.jsx';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export const ChatMenuContext = createContext({
  currentChat: null,
  setCurrentChat: () => {},
  conversations: [],
  setConversations: () => {},
  getConversations: () => {},
  loader: false,
  setLoader: () => {},
});

const ChatMenuProvider = ({ children }) => {
  // const [currentChat, setCurrentChat] = useState(null);
  const [currentChat, setCurrentChat] = useState(JSON.parse(localStorage.getItem('currentChat')) || null);
  const [conversations, setConversations] = useState([]);
  const [loader, setLoader] = useState(false);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [visibleMobile, setVisibleMobile] = useState(false)


  const getConversations = async () => {
    try {
      setLoader(true);
      const res = await axios.get("http://localhost:8000/api/conversations/" + user._id);
      setConversations(res.data);
    } catch (err){
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    setVisibleMobile(true);
		navigate(`/chat/${chat._id}`);
	};
  console.log(visibleMobile);

  useEffect(() => {
    localStorage.setItem('currentChat', JSON.stringify(currentChat));
  }, [currentChat]);

  return (
    <ChatMenuContext.Provider value={{ handleChatClick, currentChat, conversations, getConversations, loader, setLoader, visibleMobile, setVisibleMobile }}>
      {children}
    </ChatMenuContext.Provider>
  );
};

export default ChatMenuProvider;