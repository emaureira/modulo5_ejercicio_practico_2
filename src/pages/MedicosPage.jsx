import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const MedicosPage = () => {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          setError(null);
            try {
                const response = await axios.get('http://localhost:3001/medicos',
               { 
                  headers: {
                    'x-api-key': 'tu_api_key_secreta',
                    'Authorization': `Bearer ${auth.token}`,
                  },
                });
                
                setMedicos(response.data);
              } catch (err) {
                if(err.response && err.response.status === 403){
                  logout();
                  navigate('/login');
                  setError('Su sesión ha expirado por favor vuelva a iniciar sesión')
                } else if (err.response) {
                  setError(err.response.data.message);
                }else {
                  setError('Error al cargar los datos');
                }
            } finally {
                setLoading(false);
            }
        };
    
    fetchData();
  }, [auth.token, navigate, logout]);

 
    return (
        <div>
            <h2>Lista de Médicos</h2>
             {medicos.map((medico) => (
                 <div key={medico.id} className='card'>
                            <p><strong>Nombre:</strong> {medico.nombre}</p>
                            <p><strong>Apellido:</strong> {medico.apellido}</p>
                            <p><strong>Experiencia:</strong> {medico.experiencia}</p>
                            <p><strong>Especialidad:</strong> {medico.especializacion}</p>
                        <hr />
                   </div>
               ))}
        </div>
    );
}

export default MedicosPage;