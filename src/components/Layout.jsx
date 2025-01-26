import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div>
        <header >
          <nav className='navbar navbar-expand-lg'>
            <div className='container-fluid'>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0"'>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/">Home</Link>
                        </li>
                        {
                            isAuthenticated ? (
                                <>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to="/dashboard">Dashboard</Link></li>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to="/medicos">Medicos</Link></li>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to="/pacientes">Pacientes</Link></li>
                                    <li>
                                        <button className='btn' onClick={logout}>Logout</button>
                                        
                                    </li>
                                </>
                            ) : (
                                <li className='nav-item'>
                                    <Link className='nav-link' to="/login">Login</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            
          </nav>
      </header>
        
      <main className='container-fluid'>
        <div className='container'>
            <Outlet />
        </div>
      </main>
            <footer>
           </footer>
    </div>
  );
};

export default Layout;