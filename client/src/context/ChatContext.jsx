import { createContext, useState, useRef } from 'react';
import axios from 'axios';

export const ChatContext = createContext({
  currentChat: null,
  setCurrentChat: () => {},
  allUsers: [],
  setAllUsers: () => {},
  socket: null,
  conversations: [],
  getConversations: () => {},
});

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const socket = useRef();

  const getConversations = async (user) => {
    try {
        const res = await axios.get("http://localhost:8000/api/conversations/" + user._id);
        setConversations(res.data);
    } catch (err){
        console.log(err);
    } finally {
      //loader
    }
  };

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat, allUsers, setAllUsers, socket, conversations, getConversations }}>
      {children}
    </ChatContext.Provider>
  );
};

// import { createContext, useState, useRef } from 'react';

// export const ChatContext = createContext({
//   currentChat: null,
//   setCurrentChat: () => {},
//   allUsers: [],
//   setAllUsers: () => {},
//   socket: null,
// });

// export const ChatProvider = ({ children }) => {
//   const [currentChat, setCurrentChat] = useState(null);
//   const [allUsers, setAllUsers] = useState([]);
//   const socket = useRef();


//   const getConversations = async () => {
//     try {
//         const res = await axios.get("http://localhost:8000/api/conversations/" + user._id);
//         setConversations(res.data);
//     } catch (err){
//         console.log(err);
//     } finally {
//       //loader
//     }
// };

//   return (
//     <ChatContext.Provider value={{ currentChat, setCurrentChat, allUsers, setAllUsers, socket }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };