import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user && !user.admin) {
        return <Navigate to="/dashboard" />; // User thường bị đẩy về Dashboard
    }

    return children; // Là Admin thì cho qua
};

export default AdminRoute;