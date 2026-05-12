const { v4: uuidv4 } = require('uuid');
const surveyModel = require('../models/surveyModel');
const careerModel = require('../models/careerModel');

async function getQuestions(req, res, next) {
  try {
    const questions = await surveyModel.getQuestions();
    res.json({ questions });
  } catch (err) { next(err); }
}

async function submitResponses(req, res, next) {
  try {
    const { answers } = req.body;
    const sessionToken = uuidv4();

    await surveyModel.saveResponses(sessionToken, answers);

    // Calcular recomendaciones a partir de las respuestas
    const result = await computeRecommendations(answers);
    await surveyModel.saveResult(sessionToken, result);

    res.status(201).json({ sessionToken, result: { recommended_careers: result } });
  } catch (err) { next(err); }
}

async function getResult(req, res, next) {
  try {
    const result = await surveyModel.getResultByToken(req.params.sessionToken);
    if (!result) return res.status(404).json({ message: 'Resultado no encontrado' });
    res.json({ result });
  } catch (err) { next(err); }
}

// Lógica de scoring: agrupa respuestas por área y calcula afinidad con cada campo de carrera
async function computeRecommendations(answers) {
  const fields = await careerModel.findFields();

  const scores = Object.fromEntries(fields.map((f) => [f, 0]));
  let total = answers.length;

  for (const { value } of answers) {
    if (typeof value === 'object' && value.career_affinity_weights) {
      for (const [field, weight] of Object.entries(value.career_affinity_weights)) {
        if (scores[field] !== undefined) scores[field] += weight;
      }
    }
  }

  const maxScore = Math.max(...Object.values(scores), 1);
  return Object.entries(scores)
    .map(([field, score]) => ({ field, score: Math.round((score / maxScore) * 100) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

module.exports = { getQuestions, submitResponses, getResult };
