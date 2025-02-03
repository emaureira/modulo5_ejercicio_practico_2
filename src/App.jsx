// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import MedicosPage from './pages/MedicosPage';
import PacientesPage from './pages/PacientesPage';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         <Route path="/" element={<Layout />} >
           <Route index element={<HomePage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path="/medicos" element={<MedicosPage />} />
            <Route path="/pacientes" element={<PacientesPage/>} />
            </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

function PrivateRoute({ children }){
  const { auth } = useAuth();
  const navigate = useNavigate()

  if (!auth.isAuthenticated){
      navigate('/')
      return null;
  }
  return children
}

export default App;