// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de roles
        let userRole = null;
        if (username === 'doctor' && password === 'doctor123') {
           userRole = 'doctor';
        } else if (username === 'admin' && password === 'admin123') {
           userRole = 'admin';
        } else{
            alert("Usuario o contraseña incorrecta")
            return
        }

        login({ username }, userRole);
        navigate('/dashboard');
    };

    return (
        <div>
            <h2>Login</h2>
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