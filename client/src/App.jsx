import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import {Routes, Route, Navigate} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";




function App() {

  const { user } = useContext(UserContext);

  return (
    <>
    <div>

    <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Route>
        <Route path="/*" element={<PublicRoute />} >
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="homepage" element={<Homepage />} />
         
          <Route path="*" element={<Navigate to={'/homepage'} />} />
        </Route>
      </Routes>

    
   {/* <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        <Route path="/homepage" element={user ? <Dashboard /> : <Homepage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        {/* <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />  
      </Routes> */}
    </div>
    </>
  )
}

export default App
