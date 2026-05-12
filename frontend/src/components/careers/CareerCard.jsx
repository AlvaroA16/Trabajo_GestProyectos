import { Link } from 'react-router-dom';
import './CareerCard.css';

export default function CareerCard({ career }) {
  const { id, name, field, duration_years, job_outlook } = career;
  return (
    <article className="career-card">
      <span className="career-card__field">{field}</span>
      <h3 className="career-card__title">{name}</h3>
      <p className="career-card__duration">{duration_years} años</p>
      {job_outlook && <p className="career-card__outlook">{job_outlook}</p>}
      <Link to={`/careers/${id}`} className="career-card__link">Ver detalle →</Link>
    </article>
  );
}
