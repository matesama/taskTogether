import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import AddPage from "./pages/AddPage";
import GroupPage from "./pages/GroupPage";
import Homepage from "./pages/Homepage";
import {Routes, Route, Navigate} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import AddGoalsPage from "./pages/AddGoalsPage";



function App() {

  const { user } = useContext(UserContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="chat/:id" element={<ChatPage />} />
          <Route path="add" element={<AddPage />} />
          <Route path="goal" element={<AddGoalsPage />} />
          <Route path="group" element={<GroupPage />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Route>
        <Route path="/*" element={<PublicRoute />} >
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
           <Route path="homepage" element={<Homepage />} />
          <Route path="*" element={<Navigate to={'/homepage'} />} />
          {/* <Route path="*" element={<Navigate to={'/homepage'} />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App
