import { useState, useMemo, useCallback } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getCareers } from '../../services/careersService';
import CareerCard from '../../components/careers/CareerCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { FIELD_META } from '../../constants';
import './Careers.css';

const SORT_OPTIONS = [
  { key: 'name',          label: 'A–Z' },
  { key: 'employability', label: 'Más empleable' },
  { key: 'salary',        label: 'Mayor sueldo' },
  { key: 'duration',      label: 'Más corta' },
];

const ALL_FIELDS = Object.keys(FIELD_META);

export default function Careers() {
  const [activeField, setActiveField] = useState('');
  const [search, setSearch]           = useState('');
  const [sort, setSort]               = useState('name');

  const { data, loading, error } = useFetch(getCareers, []);

  const careers = useMemo(() => {
    if (!data?.careers) return [];
    let list = [...data.careers];
    if (activeField) list = list.filter((c) => c.field === activeField);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) => c.name.toLowerCase().includes(q) || c.field.toLowerCase().includes(q)
      );
    }
    if (sort === 'employability') list.sort((a, b) => b.employability - a.employability);
    else if (sort === 'salary')   list.sort((a, b) => b.avg_salary_min - a.avg_salary_min);
    else if (sort === 'duration') list.sort((a, b) => a.duration_years - b.duration_years);
    else                          list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    return list;
  }, [data, activeField, search, sort]);

  const handleFieldClick = useCallback((field) => {
    setActiveField((prev) => (prev === field ? '' : field));
  }, []);

  return (
    <main className="careers-page">
      <div className="careers-page__header">
        <p className="careers-page__eyebrow">
          {data?.careers?.length ?? '—'} CARRERAS UNIVERSITARIAS
        </p>
        <h1 className="careers-page__title">Explorador de carreras</h1>
        <p className="careers-page__sub">
          Filtra por área, ordena según lo que más te importa y descubre qué hay detrás de cada carrera.
        </p>

        <div className="careers-page__filters">
          <button
            className={`careers-page__pill ${!activeField ? 'careers-page__pill--active' : ''}`}
            onClick={() => setActiveField('')}
          >
            Todas
          </button>
          {ALL_FIELDS.map((field) => {
            const { emoji, short } = FIELD_META[field];
            return (
              <button
                key={field}
                className={`careers-page__pill ${activeField === field ? 'careers-page__pill--active' : ''}`}
                onClick={() => handleFieldClick(field)}
              >
                {emoji} {short}
              </button>
            );
          })}
        </div>

        <div className="careers-page__toolbar">
          <div className="careers-page__search-wrap">
            <span className="careers-page__search-icon">🔍</span>
            <input
              className="careers-page__search"
              type="search"
              placeholder="Buscar carrera..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="careers-page__sort">
            <span className="careers-page__sort-label">Ordenar:</span>
            {SORT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                className={`careers-page__sort-btn ${sort === key ? 'careers-page__sort-btn--active' : ''}`}
                onClick={() => setSort(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error   && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <p className="careers-page__count">
            {careers.length} carrera{careers.length !== 1 ? 's' : ''}
            {activeField ? ` en ${FIELD_META[activeField]?.short}` : ''}
            {search ? ` · "${search}"` : ''}
          </p>
          <div className="careers-page__grid">
            {careers.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>
          {careers.length === 0 && (
            <p className="careers-page__empty">
              No encontramos carreras con esos filtros. Intenta con otra búsqueda.
            </p>
          )}
        </>
      )}
    </main>
  );
}
