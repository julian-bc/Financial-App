import React, { useState } from 'react';
import './styles/Login.css';
import useSession from '../auth/useSession';
import { useNavigate } from 'react-router-dom';
import { retrieveClientByIdNumber } from '../api/client.api';

function Login() {
  // testNit = "1117499277"
  const { login } = useSession();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await retrieveClientByIdNumber(password);
      login(response);
      navigate("/");
    } catch (error) {
      alert("Ingresa una constraseña valida (nit D:)")      
      console.error(error);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">Banca Online</h1>
        <p className="login-subtitle">Bienvenido de nuevo</p>

        <form onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              id="email"
              className="form-input"
              placeholder="ejemplo@correo.com"
              required 
            />
          </div>

          {/* Campo Password (NIT por debajo) */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password" 
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;