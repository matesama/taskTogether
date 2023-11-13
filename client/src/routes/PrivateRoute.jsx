import {useContext}  from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = () => {
    const {user, token} = useContext(UserContext);
  return !user ? <Navigate to='/homepage' /> : <Outlet />;
}

export default PrivateRoute;