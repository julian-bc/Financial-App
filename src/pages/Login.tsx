import React, { useState } from 'react';
import './styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Login Procesado:");
    console.log("Usuario:", email);
    console.log("NIT (enviado como password):", password);

    window.location.href = '/'; 
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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