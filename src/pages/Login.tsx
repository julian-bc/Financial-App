import React, { useState } from 'react';
import './styles/Login.css';
import useSession from '../auth/useSession';
import { useNavigate, Link } from 'react-router-dom';
import { retrieveClientByIdNumber } from '../api/client.api';
import { useNotification } from '../auth/useNotification';
import { AxiosError } from 'axios';

function Login() {
  // testNit = "1117499277"
  const { login } = useSession();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await retrieveClientByIdNumber(password);
      login(response);
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as any;
      const message = errorMessage?.message || "Ingresa una contraseña válida";
      showNotification(message);
      console.error(error);
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="auth-redirect">
          <p>
            ¿No tienes una cuenta? 
            <Link to="/register" className="auth-link">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;