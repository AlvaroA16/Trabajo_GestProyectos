import './QuestionCard.css';

export default function QuestionCard({ question, currentAnswer, onAnswer }) {
  const { id, question_text, question_type, options } = question;

  return (
    <div className="question-card">
      <p className="question-card__text">{question_text}</p>

      {question_type === 'multiple_choice' && (
        <ul className="question-card__options">
          {options.map((opt) => (
            <li key={opt.id}>
              <button
                className={`question-card__option ${currentAnswer === opt.id ? 'question-card__option--selected' : ''}`}
                onClick={() => onAnswer(id, opt.id)}
              >
                {opt.option_text}
              </button>
            </li>
          ))}
        </ul>
      )}

      {question_type === 'scale' && (
        <div className="question-card__scale">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`question-card__scale-btn ${currentAnswer === n ? 'question-card__scale-btn--selected' : ''}`}
              onClick={() => onAnswer(id, n)}
            >
              {n}
            </button>
          ))}
          <div className="question-card__scale-labels">
            <span>Nada</span><span>Mucho</span>
          </div>
        </div>
      )}
    </div>
  );
}
