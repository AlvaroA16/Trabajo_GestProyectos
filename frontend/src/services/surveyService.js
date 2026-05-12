import api from './api';

export const getSurveyQuestions = () => api.get('/survey/questions');
export const submitSurveyResponses = (payload) => api.post('/survey/responses', payload);
export const getSurveyResult = (sessionToken) =>
  api.get(`/survey/results/${sessionToken}`);
