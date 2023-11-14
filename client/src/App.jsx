import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import AddPage from "./pages/AddPage";
import GroupPage from "./pages/GroupPage";
// import Homepage from "./pages/Homepage";
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
          <Route index element={<DashboardPage />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Route>
        <Route path="/*" element={<PublicRoute />} >
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          {/* <Route path="homepage" element={<Homepage />} /> */}
          <Route path="*" element={<Navigate to={'/homepage'} />} />
        </Route>
      </Routes>

    {/* <Routes>
      <Route path="/" element={user ? <DashboardPage /> : <LoginPage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
      <Route path="/chat/:id" element={user ? <ChatPage /> : <Navigate to="/login" />} />
      <Route path="/add" element={user ? <AddPage /> : <Navigate to="/login" />} />
      <Route path="/group" element={user ? <GroupPage /> : <Navigate to="/login" />} />
    </Routes> */}
    </div>
    </>
  )
}

export default App
