import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import {Routes, Route} from "react-router-dom";



function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
    </>
  )
}

export default App
