import { useState, useMemo } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getUniversities } from '../../services/universitiesService';
import UniversityCard from '../../components/universities/UniversityCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import './Universities.css';

const TYPE_FILTERS = [
  { key: '',         label: 'Todas' },
  { key: 'Pública',  label: '🏛️ Pública' },
  { key: 'Privada',  label: '🏢 Privada' },
];

const SORT_OPTIONS = [
  { key: 'name',    label: 'A–Z' },
  { key: 'cost',    label: 'Menor costo' },
  { key: 'ancient', label: 'Más antigua' },
];

export default function Universities() {
  const [activeType, setActiveType] = useState('');
  const [activeRegion, setActiveRegion] = useState('');
  const [search, setSearch]             = useState('');
  const [sort, setSort]                 = useState('name');

  const { data, loading, error } = useFetch(getUniversities, []);

  const universities = useMemo(() => {
    if (!data?.universities) return [];
    let list = [...data.universities];
    if (activeType)   list = list.filter((u) => u.type === activeType);
    if (activeRegion) list = list.filter((u) => u.location_region === activeRegion);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) => u.name.toLowerCase().includes(q) || u.acronym.toLowerCase().includes(q)
      );
    }
    if (sort === 'cost')    list.sort((a, b) => a.cost_month - b.cost_month);
    else if (sort === 'ancient') list.sort((a, b) => a.founded - b.founded);
    else                    list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    return list;
  }, [data, activeType, activeRegion, search, sort]);

  // Unique regions present in the data
  const regions = useMemo(() => {
    if (!data?.universities) return [];
    return [...new Set(data.universities.map((u) => u.location_region))].sort();
  }, [data]);

  return (
    <main className="universities-page">
      <div className="universities-page__header">
        <p className="universities-page__eyebrow">
          {data?.universities?.length ?? '—'} UNIVERSIDADES EN PERÚ
        </p>
        <h1 className="universities-page__title">Explorador de universidades</h1>
        <p className="universities-page__sub">
          Filtra por tipo y región, ordena por costo o antigüedad y encuentra la universidad ideal para ti.
        </p>

        {/* Type pills */}
        <div className="universities-page__filters">
          {TYPE_FILTERS.map(({ key, label }) => (
            <button
              key={key}
              className={`universities-page__pill ${activeType === key ? 'universities-page__pill--active' : ''}`}
              onClick={() => setActiveType(key)}
            >
              {label}
            </button>
          ))}

          {/* Region selector as pill-style select */}
          <select
            className="universities-page__region-select"
            value={activeRegion}
            onChange={(e) => setActiveRegion(e.target.value)}
          >
            <option value="">📍 Todas las regiones</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Search + sort toolbar */}
        <div className="universities-page__toolbar">
          <div className="universities-page__search-wrap">
            <span className="universities-page__search-icon">🔍</span>
            <input
              className="universities-page__search"
              type="search"
              placeholder="Buscar universidad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="universities-page__sort">
            <span className="universities-page__sort-label">Ordenar:</span>
            {SORT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                className={`universities-page__sort-btn ${sort === key ? 'universities-page__sort-btn--active' : ''}`}
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
          <p className="universities-page__count">
            {universities.length} universidad{universities.length !== 1 ? 'es' : ''}
            {activeType ? ` · ${activeType}s` : ''}
            {activeRegion ? ` en ${activeRegion}` : ''}
            {search ? ` · "${search}"` : ''}
          </p>
          <div className="universities-page__grid">
            {universities.map((u) => (
              <UniversityCard key={u.id} university={u} />
            ))}
          </div>
          {universities.length === 0 && (
            <p className="universities-page__empty">
              No encontramos universidades con esos filtros.
            </p>
          )}
        </>
      )}
    </main>
  );
}
