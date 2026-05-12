import { createContext, useContext, useState } from 'react';

const SurveyContext = createContext(null);

export function SurveyProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionToken, setSessionToken] = useState(null);
  const [result, setResult] = useState(null);

  const saveAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setSessionToken(null);
    setResult(null);
  };

  return (
    <SurveyContext.Provider value={{ currentStep, setCurrentStep, answers, saveAnswer, sessionToken, setSessionToken, result, setResult, reset }}>
      {children}
    </SurveyContext.Provider>
  );
}

export const useSurvey = () => useContext(SurveyContext);
