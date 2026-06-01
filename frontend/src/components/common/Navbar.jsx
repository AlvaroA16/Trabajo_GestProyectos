import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/',             label: 'Inicio' },
  { to: '/survey',       label: 'Test vocacional' },
  { to: '/careers',      label: 'Carreras' },
  { to: '/universities', label: 'Universidades' },
  { to: '/compare',      label: 'Comparar mallas' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-icon">D</span>
        Decide Hoy
      </Link>

      <ul className="navbar__links">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              <span className="navbar__dot" aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        {user ? (
          <>
            <span className="navbar__username">Hola, {user.full_name.split(' ')[0]}</span>
            <button className="navbar__btn-outline" onClick={handleLogout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__btn-outline">Entrar</Link>
            <Link to="/register" className="navbar__btn-filled">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
