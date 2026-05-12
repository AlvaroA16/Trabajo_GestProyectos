import { useFetch } from '../../hooks/useFetch';
import { getWorkshops } from '../../services/workshopsService';
import WorkshopCard from '../../components/workshops/WorkshopCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import './Workshops.css';

export default function Workshops() {
  const { data, loading, error } = useFetch(getWorkshops, []);

  return (
    <main className="workshops-page">
      <h1>Talleres Presenciales</h1>
      <p>Plan piloto gratuito para alumnos de 4to y 5to de secundaria. Cupos limitados.</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="workshops-page__grid">
          {data.workshops?.map((w) => <WorkshopCard key={w.id} workshop={w} />)}
        </div>
      )}
    </main>
  );
}
