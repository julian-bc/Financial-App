import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './styles/Register.css';

const registerSchema = z.object({
  idType: z.enum(['CIUDADANIA_CEDULA', 'EXTRANJERIA_CEDULA', 'PASAPORTE', 'PEP']),
  idNum: z.string().min(5, "El número de documento es demasiado corto"),
  firstName: z.string().min(2, "El nombre es obligatorio"),
  lastName: z.string().min(2, "El apellido es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha de nacimiento inválida",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      idType: 'CIUDADANIA_CEDULA'
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("🚀 Datos validados listos para el backend:", data);
    alert("Registro exitoso. Redirigiendo...");
    window.location.href = '/login';
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        <h1 className="register-title">Crea tu Cuenta</h1>
        <p className="register-subtitle">Ingresa tus datos oficiales</p>

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input 
                {...register("firstName")}
                className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                placeholder="Ej: Julian"
              />
              {errors.firstName && <span className="error-msg">{errors.firstName.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Apellido</label>
              <input 
                {...register("lastName")}
                className={`form-input ${errors.lastName ? 'input-error' : ''}`}
                placeholder="Ej: Enrique"
              />
              {errors.lastName && <span className="error-msg">{errors.lastName.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Tipo de Documento</label>
              <select {...register("idType")} className="form-input">
                <option value="CIUDADANIA_CEDULA">Cédula de Ciudadanía</option>
                <option value="EXTRANJERIA_CEDULA">Cédula de Extranjería</option>
                <option value="PASAPORTE">Pasaporte</option>
                <option value="PEP">PEP</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Número de ID</label>
              <input 
                {...register("idNum")}
                className={`form-input ${errors.idNum ? 'input-error' : ''}`}
                placeholder="12345678"
              />
              {errors.idNum && <span className="error-msg">{errors.idNum.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Fecha de Nacimiento</label>
            <input 
              type="date"
              {...register("birthDate")}
              className={`form-input ${errors.birthDate ? 'input-error' : ''}`}
            />
            {errors.birthDate && <span className="error-msg">{errors.birthDate.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              {...register("email")}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="tu@correo.com"
            />
            {errors.email && <span className="error-msg">{errors.email.message}</span>}
          </div>

          <button type="submit" className="btn-register">Registrar Cuenta</button>
          
          <p className="register-footer">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;