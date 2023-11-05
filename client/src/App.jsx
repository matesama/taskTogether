import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import {Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";




function App() {

  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();

  return (
    <>
    <div>
    <Routes>
        <Route path="/" element={user ? <Chat /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </div>
    </>
  )
}

export default App
