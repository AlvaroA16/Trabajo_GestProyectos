import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { animate, stagger, splitText } from 'animejs';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const imageColRef = useRef(null);

  useEffect(() => {
    // Entrada de la imagen: slide desde la izquierda + fade
    if (imageColRef.current) {
      animate(imageColRef.current, {
        opacity: [0, 1],
        translateX: ['-60px', '0px'],
        duration: 1000,
        ease: 'outExpo',
      });
    }

    // Animación del título (con delay para que entre después de la imagen)
    if (titleRef.current) {
      const { chars } = splitText(titleRef.current, { words: false, chars: true });
      animate(chars, {
        y: [
          { to: '-2.75rem', ease: 'outExpo', duration: 500 },
          { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
        ],
        rotate: {
          from: '-1turn',
          delay: 0,
        },
        delay: stagger(50, { start: 400 }),
        ease: 'inOutCirc',
        loopDelay: 2000,
        loop: false,
      });
    }
  }, []);

  return (
    <main className="home">
      <div className="home__image-col" ref={imageColRef}>
        <img src="/students.png" alt="Estudiantes" className="home__students" />
      </div>

      <section className="home__content">
        <h1 className="home__title" ref={titleRef}>
          Decide <span className="home__title-accent">hoy</span>.
        </h1>

        <p className="home__subtitle">
          Tu futuro comienza con una decisión inteligente. Descubre tus habilidades,
          intereses y el camino profesional ideal para ti con una experiencia
          vocacional moderna, rápida y personalizada.
        </p>

        <button className="home__cta" onClick={() => navigate('/register')}>
          Empezar test
        </button>
      </section>
    </main>
  );
}
