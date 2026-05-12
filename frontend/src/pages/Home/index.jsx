import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <span className="home__badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Orientación vocacional
          </span>

          <h1 className="home__heading">
            ¿Qué vas a estudiar<br />
            <em className="home__heading-highlight">cuando termines</em>{' '}
            el cole?
          </h1>

          <p className="home__subtitle">
            OrientaPerú es un test vocacional pensado para estudiantes de secundaria.
            En 5 minutos descubres las carreras que mejor se adaptan a tu perfil.
          </p>

          <div className="home__cta-row">
            <Link to="/survey" className="home__cta-btn">
              Empezar test gratis <span aria-hidden="true">→</span>
            </Link>
            <span className="home__cta-meta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              5 min · 15 preguntas
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
