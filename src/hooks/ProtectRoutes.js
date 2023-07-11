import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './Auth.js';

export const ProtectRoutes = () => {
    const { cookies } = useAuth();

    return cookies.token ? <Outlet/> : <Navigate to='/login' exact />
};