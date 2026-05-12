import { useEffect } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { useFetch } from '../../hooks/useFetch';
import { getSurveyQuestions, submitSurveyResponses } from '../../services/surveyService';
import QuestionCard from '../../components/survey/QuestionCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import SurveyResult from './SurveyResult';
import './Survey.css';

export default function Survey() {
  const { currentStep, setCurrentStep, answers, saveAnswer, sessionToken, setSessionToken, result, setResult, reset } = useSurvey();
  const { data, loading, error } = useFetch(getSurveyQuestions, []);

  const questions = data?.questions || [];
  const isLast = currentStep === questions.length - 1;
  const currentQuestion = questions[currentStep];

  const handleNext = async () => {
    if (isLast) {
      const payload = { answers: Object.entries(answers).map(([questionId, value]) => ({ questionId, value })) };
      try {
        const res = await submitSurveyResponses(payload);
        setSessionToken(res.sessionToken);
        setResult(res.result);
      } catch (e) {
        alert('Error al enviar respuestas. Inténtalo de nuevo.');
      }
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  if (result) return <SurveyResult result={result} onReset={reset} />;

  return (
    <main className="survey-page">
      <h1>Encuesta Vocacional</h1>
      <p className="survey-page__subtitle">Responde honestamente para obtener recomendaciones personalizadas.</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {currentQuestion && (
        <>
          <div className="survey-page__progress">
            <div className="survey-page__progress-bar" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />
          </div>
          <p className="survey-page__step">Pregunta {currentStep + 1} de {questions.length}</p>
          <QuestionCard question={currentQuestion} currentAnswer={answers[currentQuestion.id]} onAnswer={saveAnswer} />
          <div className="survey-page__nav">
            {currentStep > 0 && <button onClick={() => setCurrentStep((s) => s - 1)}>← Anterior</button>}
            <button onClick={handleNext} disabled={!answers[currentQuestion.id]} className="btn-primary">
              {isLast ? 'Ver resultados' : 'Siguiente →'}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
