import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import AddPage from "./pages/AddPage";
import GroupPage from "./pages/GroupPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
// import AuthContext from "./context/AuthContext";




function App() {

  const { user } = useContext(UserContext);
  // const { user } = useContext(AuthContext);

  return (
    <>
    <div>
    <Routes>
        <Route path="/" element={user ? <DashboardPage /> : <LoginPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/chat/:id" element={user ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/add" element={user ? <AddPage /> : <Navigate to="/login" />} />
        <Route path="/group" element={user ? <GroupPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
    </>
  )
}

export default App
