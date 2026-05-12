import './LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Cargando...' }) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" aria-label="Cargando" />
      <p>{message}</p>
    </div>
  );
}
