import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/',             label: 'Inicio' },
  { to: '/survey',       label: 'Test vocacional' },
  { to: '/careers',      label: 'Carreras' },
  { to: '/universities', label: 'Universidades' },
  { to: '/compare',      label: 'Comparar mallas' },
];

export default function Navbar() {
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
        <Link to="/login" className="navbar__btn-outline">Entrar</Link>
        <Link to="/register" className="navbar__btn-filled">Registrarse</Link>
      </div>
    </nav>
  );
}
