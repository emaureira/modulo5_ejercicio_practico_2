import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import MedicosPage from './pages/MedicosPage';
import PacientesPage from './pages/PacientesPage';



// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Layout />} >
           <Route index element={<HomePage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/medicos" element={<ProtectedRoute><MedicosPage /></ProtectedRoute>} />
            <Route path="/pacientes" element={<ProtectedRoute><PacientesPage/></ProtectedRoute>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;