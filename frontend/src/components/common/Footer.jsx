import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} OrientaPerú — Orientación vocacional para estudiantes peruanos.</p>
      <p>Este servicio no gestiona matrículas universitarias.</p>
    </footer>
  );
}
