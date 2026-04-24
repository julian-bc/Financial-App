import { LogOut, User } from 'lucide-react';
import './styles/Navbar.css';
import useSession from '../auth/useSession';

interface NavbarProps {
  name: string;
}

function Navbar({ name }: NavbarProps) {
  const { logout } = useSession(); 
  
  const handleLogout = () => {
    logout();
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