import './About.css';

export default function About() {
  return (
    <main className="about-page">
      <h1>Sobre OrientaPerú</h1>
      <section className="about-page__section">
        <h2>¿Qué es OrientaPerú?</h2>
        <p>
          OrientaPerú es una plataforma de orientación vocacional dirigida a estudiantes de 4to y 5to
          de secundaria en el Perú. Nuestro objetivo es brindar información clara, actualizada y
          comparativa sobre carreras universitarias y las instituciones que las ofrecen.
        </p>
      </section>
      <section className="about-page__section">
        <h2>¿Qué ofrecemos?</h2>
        <ul>
          <li>Información sobre más de 100 carreras profesionales.</li>
          <li>Perfiles de las principales universidades peruanas.</li>
          <li>Comparador de mallas curriculares entre universidades.</li>
          <li>Encuesta vocacional para ayudarte a descubrir tu perfil.</li>
          <li>Talleres presenciales gratuitos (plan piloto).</li>
        </ul>
      </section>
      <section className="about-page__section about-page__disclaimer">
        <h2>Importante</h2>
        <p>
          OrientaPerú <strong>no gestiona matrículas universitarias</strong>. Para inscribirte en
          una universidad, debes comunicarte directamente con la institución de tu interés.
        </p>
      </section>
    </main>
  );
}
