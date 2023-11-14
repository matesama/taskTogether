import {useContext}  from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PublicRoute = () => {
    const {user, token} = useContext(UserContext);
    return user ? <Navigate to='/' /> : <Outlet />;
}

export default PublicRoute;