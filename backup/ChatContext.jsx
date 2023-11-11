// context/ChatContext.js

import { createContext, useState, useRef } from 'react';

export const ChatContext = createContext({
  currentChat: null,
  setCurrentChat: () => {},
  allUsers: [],
  setAllUsers: () => {},
  socket: null,
});

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const socket = useRef();

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat, allUsers, setAllUsers, socket }}>
      {children}
    </ChatContext.Provider>
  );
};