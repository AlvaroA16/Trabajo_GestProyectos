import { Link } from 'react-router-dom';
import './Survey.css';

export default function SurveyResult({ result, onReset }) {
  return (
    <div className="survey-result">
      <h2>Tus carreras recomendadas</h2>
      <ul className="survey-result__list">
        {result?.recommended_careers?.map((item) => (
          <li key={item.career_id} className="survey-result__item">
            <span className="survey-result__score">{item.score}%</span>
            <div>
              <strong>{item.career_name}</strong>
              <p>{item.field}</p>
            </div>
            <Link to={`/careers/${item.career_id}`}>Ver →</Link>
          </li>
        ))}
      </ul>
      <button onClick={onReset} className="survey-result__reset">Repetir encuesta</button>
    </div>
  );
}
