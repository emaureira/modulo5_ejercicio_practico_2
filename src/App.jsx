import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './assets/components/navbar';

// importamos las vistas
import Home from './assets/vistas/home';
import Login from './assets/vistas/login';
import Logout from './assets/vistas/logout';
import Nosotros from './assets/vistas/nosotros';
import EquipoMedico from './assets/vistas/equipoMedico';
import RegistroPacientes from './assets/vistas/registroPacientes';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container ps-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/equipo-medico" element={<EquipoMedico />} />
          <Route path="/registro-pacientes" element={<RegistroPacientes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// https://github.com/emaureira/modulo5_ejercicio_2.git
