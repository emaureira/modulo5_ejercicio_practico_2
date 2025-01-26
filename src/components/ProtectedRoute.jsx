// Componente para proteger rutas
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole } = useAuth();

  if(!isAuthenticated) {
        return <Navigate to="/login" />;
  }
   if(requiredRole && !hasRole(requiredRole)){
         return <Navigate to="/" />;
   }
    return children;
};
export default ProtectedRoute