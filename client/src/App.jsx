import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";




function App() {

  const { user } = useContext(AuthContext);

  return (
    <>
    <div>
    <Routes>
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
