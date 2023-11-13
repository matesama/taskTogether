import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import {Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";




function App() {

  const { user } = useContext(UserContext);

  return (
    <>
    <div>
    <Routes>
        <Route path="/home" element={user ? <Dashboard /> : <Home />} />
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        {/* <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />  */}
      </Routes>
    </div>
    </>
  )
}

export default App
