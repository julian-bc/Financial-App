import { LogOut, User } from 'lucide-react';
import './styles/Navbar.css';

interface NavbarProps {
  name: string;
}

function Navbar({ name }: NavbarProps) {
  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="user-section">
          <div className="user-avatar">
            <User size={18} />
          </div>
          <span className="user-name">Hola, <strong>{name}</strong></span>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          <span>Cerrar Sesión</span>
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar