// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import MedicosPage from './pages/MedicosPage';
import PacientesPage from './pages/PacientesPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Layout />} >
           <Route index element={<HomePage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/medicos" element={<ProtectedRoute requiredRole="doctor"><MedicosPage /></ProtectedRoute>} />
            <Route path="/pacientes" element={<ProtectedRoute requiredRole="admin"><PacientesPage/></ProtectedRoute>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;