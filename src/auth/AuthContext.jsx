import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda información del usuario autenticado (null si no lo está)

  const login = (userData) => {
    // Implementa lógica de login (ej: llamada a API)
    setUser(userData); // Simulamos el inicio de sesión
  };

  const logout = () => {
    setUser(null);
    // Implementar lógica para cerrar sesión (ej: borrar token)
  };
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};