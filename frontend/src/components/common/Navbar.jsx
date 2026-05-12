import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-icon" aria-hidden="true">🎯</span>
        OrientaPerú
      </Link>

      <ul className="navbar__links">
        <li><NavLink to="/careers">Carreras</NavLink></li>
        <li><NavLink to="/universities">Universidades</NavLink></li>
        <li><NavLink to="/compare">Comparar Mallas</NavLink></li>
        <li><NavLink to="/workshops">Talleres</NavLink></li>
      </ul>

      <div className="navbar__actions">
        <NavLink to="/about" className="navbar__action-link">Nosotros</NavLink>
        <Link to="/survey" className="navbar__action-btn">Hacer el test</Link>
      </div>
    </nav>
  );
}
