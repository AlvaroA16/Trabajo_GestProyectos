import { useState, useCallback } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getCareers } from '../../services/careersService';
import CareerCard from '../../components/careers/CareerCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { CAREER_FIELDS } from '../../constants';
import './Careers.css';

export default function Careers() {
  const [selectedField, setSelectedField] = useState('');

  const fetchFn = useCallback(() => getCareers(selectedField ? { field: selectedField } : {}), [selectedField]);
  const { data, loading, error } = useFetch(fetchFn, [selectedField]);

  return (
    <main className="careers-page">
      <h1>Carreras en Perú</h1>
      <div className="careers-page__filters">
        <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
          <option value="">Todas las áreas</option>
          {Object.entries(CAREER_FIELDS).map(([key, label]) => (
            <option key={key} value={label}>{label}</option>
          ))}
        </select>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="careers-page__grid">
          {data.careers?.map((career) => <CareerCard key={career.id} career={career} />)}
        </div>
      )}
    </main>
  );
}
