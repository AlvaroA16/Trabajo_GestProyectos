import { useState, useCallback } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getUniversities } from '../../services/universitiesService';
import UniversityCard from '../../components/universities/UniversityCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { UNIVERSITY_TYPES, PERU_REGIONS } from '../../constants';
import './Universities.css';

export default function Universities() {
  const [filters, setFilters] = useState({ type: '', region: '' });

  const fetchFn = useCallback(() => getUniversities(filters), [filters]);
  const { data, loading, error } = useFetch(fetchFn, [filters]);

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="universities-page">
      <h1>Universidades en Perú</h1>
      <div className="universities-page__filters">
        <select value={filters.type} onChange={(e) => updateFilter('type', e.target.value)}>
          <option value="">Todo tipo</option>
          {Object.values(UNIVERSITY_TYPES).map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filters.region} onChange={(e) => updateFilter('region', e.target.value)}>
          <option value="">Todas las regiones</option>
          {PERU_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="universities-page__grid">
          {data.universities?.map((u) => <UniversityCard key={u.id} university={u} />)}
        </div>
      )}
    </main>
  );
}
