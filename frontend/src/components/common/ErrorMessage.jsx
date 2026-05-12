import './ErrorMessage.css';

export default function ErrorMessage({ message = 'Ocurrió un error inesperado.', onRetry }) {
  return (
    <div className="error-message">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Reintentar</button>}
    </div>
  );
}
