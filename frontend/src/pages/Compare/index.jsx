import { useState } from 'react';
import { compareUniversities } from '../../services/comparisonService';
import { getCareers } from '../../services/careersService';
import { getUniversitiesByCareer } from '../../services/universitiesService';
import { useFetch } from '../../hooks/useFetch';
import ComparisonTable from '../../components/comparison/ComparisonTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import './Compare.css';

export default function Compare() {
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [compareError, setCompareError] = useState(null);

  const { data: careersData } = useFetch(getCareers, []);
  const { data: univData } = useFetch(
    () => selectedCareer ? getUniversitiesByCareer(selectedCareer) : Promise.resolve({ universities: [] }),
    [selectedCareer]
  );

  const toggleUniversity = (id) => {
    setSelectedUniversities((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleCompare = async () => {
    setComparing(true);
    setCompareError(null);
    try {
      const data = await compareUniversities(selectedCareer, selectedUniversities);
      setComparisonData(data);
    } catch (e) {
      setCompareError(e.message);
    } finally {
      setComparing(false);
    }
  };

  return (
    <main className="compare-page">
      <h1>Comparar Mallas Curriculares</h1>
      <p>Selecciona una carrera y hasta 3 universidades para comparar sus planes de estudio.</p>

      <div className="compare-page__selectors">
        <select value={selectedCareer} onChange={(e) => { setSelectedCareer(e.target.value); setSelectedUniversities([]); setComparisonData(null); }}>
          <option value="">Selecciona una carrera</option>
          {careersData?.careers?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        {univData?.universities?.length > 0 && (
          <div className="compare-page__universities">
            <p>Elige hasta 3 universidades:</p>
            {univData.universities.map((u) => (
              <label key={u.id} className={`compare-page__univ-option ${selectedUniversities.includes(u.id) ? 'compare-page__univ-option--selected' : ''}`}>
                <input type="checkbox" checked={selectedUniversities.includes(u.id)} onChange={() => toggleUniversity(u.id)} />
                {u.name}
              </label>
            ))}
          </div>
        )}

        <button onClick={handleCompare} disabled={!selectedCareer || selectedUniversities.length < 2} className="compare-page__btn">
          Comparar mallas
        </button>
      </div>

      {comparing && <LoadingSpinner message="Cargando mallas curriculares..." />}
      {compareError && <ErrorMessage message={compareError} />}
      {comparisonData && <ComparisonTable data={comparisonData.comparison} />}
    </main>
  );
}
