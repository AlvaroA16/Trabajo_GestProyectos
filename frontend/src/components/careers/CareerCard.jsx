import { Link } from 'react-router-dom';
import { FIELD_META } from '../../constants';
import './CareerCard.css';

export default function CareerCard({ career }) {
  const { id, name, field, duration_years, avg_salary_min, employability, description } = career;
  const meta = FIELD_META[field] || { emoji: '📌', short: field, color: '#6B7280', bg: '#F9FAFB' };

  return (
    <article className="career-card">
      <div className="career-card__top">
        <span
          className="career-card__field-badge"
          style={{ color: meta.color, background: meta.bg }}
        >
          {meta.emoji} {meta.short}
        </span>
        <span className="career-card__employability">
          📈 {employability}%
        </span>
      </div>

      <h3 className="career-card__name">{name}</h3>
      <p className="career-card__desc">{description}</p>

      <div className="career-card__footer">
        <span className="career-card__stat">⏱ {duration_years} años</span>
        <span className="career-card__stat">
          💰 S/ {(avg_salary_min / 1000).toFixed(1)}k inicial
        </span>
      </div>

      <Link to={`/careers/${id}`} className="career-card__link">
        Ver carrera →
      </Link>
    </article>
  );
}
