import './UniversityCard.css';

const TYPE_META = {
  'Pública':  { color: '#10B981', bg: '#ECFDF5' },
  'Privada':  { color: '#8B5CF6', bg: '#F5F3FF' },
};

export default function UniversityCard({ university }) {
  const { name, acronym, location_city, location_region, type, founded, cost_month, accreditation_status, website } = university;
  const meta = TYPE_META[type] || { color: '#6B7280', bg: '#F9FAFB' };

  return (
    <article className="university-card">
      <div className="university-card__top">
        <span
          className="university-card__type-badge"
          style={{ color: meta.color, background: meta.bg }}
        >
          {type}
        </span>
        <span className="university-card__founded">Fundada {founded}</span>
      </div>

      <h3 className="university-card__acronym">{acronym}</h3>
      <p className="university-card__name">{name}</p>
      <p className="university-card__location">📍 {location_city}, {location_region}</p>

      <div className="university-card__footer">
        <span className="university-card__stat">
          💰 {cost_month === 0 ? 'Gratuita' : `S/ ${cost_month.toLocaleString('es-PE')}/mes`}
        </span>
        {accreditation_status && (
          <span className="university-card__stat university-card__stat--green">
            ✓ {accreditation_status}
          </span>
        )}
      </div>

      {website ? (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="university-card__link"
        >
          Ver universidad →
        </a>
      ) : (
        <span className="university-card__link university-card__link--disabled">
          Sitio web no disponible
        </span>
      )}
    </article>
  );
}
