// auth/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda información del usuario autenticado (null si no lo está)
  const [role, setRole] = useState(null); // Almacenar el rol del usuario

  const login = (userData, userRole) => { // Aceptar role al loguear
    setUser(userData);
    setRole(userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null); // Resetear el rol al cerrar sesión
  };

  // Método para verificar si el usuario tiene un rol especifico
  const hasRole = (requiredRole) => {
     return role === requiredRole; 
  };

  const value = {
    user,
    role,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};