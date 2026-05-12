import { Link } from 'react-router-dom';
import './UniversityCard.css';

export default function UniversityCard({ university }) {
  const { id, name, acronym, location_city, location_region, type, accreditation_status } = university;
  return (
    <article className="university-card">
      <div className="university-card__header">
        <span className="university-card__acronym">{acronym}</span>
        <span className={`university-card__type university-card__type--${type.toLowerCase()}`}>{type}</span>
      </div>
      <h3 className="university-card__name">{name}</h3>
      <p className="university-card__location">{location_city}, {location_region}</p>
      {accreditation_status && (
        <p className="university-card__accreditation">{accreditation_status}</p>
      )}
      <Link to={`/universities/${id}`} className="university-card__link">Ver universidad →</Link>
    </article>
  );
}
