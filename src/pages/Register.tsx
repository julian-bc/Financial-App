import React, { useState } from 'react';
import './styles/Register.css';
import useSession from '../auth/useSession';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../auth/useNotification';
import { AxiosError } from 'axios';
import type { ClientRequest } from '../api/interfaces/client.interfaces';

function Register() {
  const { register: registerUser } = useSession();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    idType: 'CIUDADANIA_CEDULA',
    idNum: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    emailAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDateToDdMmYyyy = (dateString: string): string => {
    // dateString viene en formato YYYY-MM-DD
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const clientData: ClientRequest = {
        idType: formData.idType as any,
        idNum: formData.idNum,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formatDateToDdMmYyyy(formData.birthDate) as any,
        emailAddress: formData.emailAddress,
      };

      await registerUser(clientData);
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as any;
      const message = errorMessage?.message || "Error al registrar. Por favor intente de nuevo.";
      showNotification(message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        <h1 className="register-title">Crear Cuenta</h1>
        <p className="register-subtitle">Únete a nuestro banco digital</p>

        <form onSubmit={handleSubmit}>
          {/* Tipo de Identificación */}
          <div className="form-group">
            <label htmlFor="idTypes" className="form-label">Tipo de Identificación</label>
            <select 
              id="idTypes"
              name="idTypes"
              className="form-input"
              value={formData.idType}
              onChange={handleChange}
              required
              disabled={isLoading}
            >
              <option value="CIUDADANIA_CEDULA">Cédula de Ciudadanía</option>
              <option value="EXTRANJERIA_CEDULA">Cédula de Extranjería</option>
              <option value="PASAPORTE">Pasaporte</option>
              <option value="PEP">PEP</option>
            </select>
          </div>

          {/* Número de Identificación */}
          <div className="form-group">
            <label htmlFor="idNum" className="form-label">Número de Identificación</label>
            <input 
              type="text" 
              id="idNum"
              name="idNum"
              className="form-input"
              placeholder="1234567890"
              value={formData.idNum}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">Nombre</label>
            <input 
              type="text" 
              id="firstName"
              name="firstName"
              className="form-input"
              placeholder="Juan"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Apellido */}
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Apellido</label>
            <input 
              type="text" 
              id="lastName"
              name="lastName"
              className="form-input"
              placeholder="Pérez"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div className="form-group">
            <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento</label>
            <input 
              type="date" 
              id="birthDate"
              name="birthDate"
              className="form-input"
              value={formData.birthDate}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Correo Electrónico */}
          <div className="form-group">
            <label htmlFor="emailAddress" className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              id="emailAddress"
              name="emailAddress"
              className="form-input"
              placeholder="ejemplo@correo.com"
              value={formData.emailAddress}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn-register" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <div className="auth-redirect">
          <p>
            ¿Ya tienes una cuenta? 
            <Link to="/login" className="auth-link">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;