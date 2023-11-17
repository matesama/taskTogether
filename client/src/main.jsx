import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import  ChatBoxProvider  from "./context/ChatBoxContext";
import  UserProvider  from "./context/UserContext";
import ChatMenuProvider from './context/ChatMenuContext.jsx';
import NavigationProvider from './context/NavigationContext.jsx';
import GroupProvider from './context/GroupContext.jsx';
import AddProvider from './context/AddContext.jsx';
// import SocketProvider from './context/SocketContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    {/* <SocketProvider> */}
      <UserProvider>
        <NavigationProvider>
          <ChatBoxProvider>
            <AddProvider>
              <ChatMenuProvider>
                <GroupProvider>
                  <App />
                </GroupProvider>
              </ChatMenuProvider>
            </AddProvider>
          </ChatBoxProvider>
        </NavigationProvider>
      </UserProvider>
    {/* </SocketProvider> */}
  </BrowserRouter>


)
