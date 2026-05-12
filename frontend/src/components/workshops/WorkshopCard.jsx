import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils';
import './WorkshopCard.css';

export default function WorkshopCard({ workshop }) {
  const { id, title, target_grade, date, time_start, time_end, location, capacity, registered_count } = workshop;
  const spotsLeft = capacity - (registered_count || 0);

  return (
    <article className="workshop-card">
      <span className="workshop-card__grade">{target_grade}</span>
      <h3 className="workshop-card__title">{title}</h3>
      <p className="workshop-card__datetime">📅 {formatDate(date)} · {formatTime(time_start)} – {formatTime(time_end)}</p>
      <p className="workshop-card__location">📍 {location}</p>
      <p className={`workshop-card__spots ${spotsLeft <= 5 ? 'workshop-card__spots--low' : ''}`}>
        {spotsLeft > 0 ? `${spotsLeft} cupos disponibles` : 'Sin cupos disponibles'}
      </p>
      <Link to={`/workshops/${id}`} className="workshop-card__link">Inscribirse →</Link>
    </article>
  );
}
