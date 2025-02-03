// pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
           
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password,
            }, {
                headers: {
                    'x-api-key': 'tu_api_key_secreta',
                },
            });
            
            if (response.status === 200) {
                console.log(response);
                login(response.data.token);
                navigate("/dashboard");
            } else {
                setError('Credenciales inválidas');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
               
                setError("Error al contactar con el servidor:" );
            }
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label className='form-label'>
                    Username:
                    <input className='form-control' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label className='form-label'>
                    Password:
                    <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button className='btn btn-secondary' type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;