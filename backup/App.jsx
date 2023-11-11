import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import {Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ChatProvider>
      <div>
        <Routes>
          <Route path="/*" element={user ? <Dashboard /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/chat/:id" element={user ? <ChatPage /> : <Navigate to="/login" />} />
          {/* <Route path="/add" element={user ? <AddPage /> : <Navigate to="/login" />} />
          <Route path="/group" element={user ? <GroupPage /> : <Navigate to="/login" />} /> */}
        </Routes>
      </div>
    </ChatProvider>
  )
}

export default App;