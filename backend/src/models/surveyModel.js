const pool = require('../config/database');

async function getQuestions() {
  const { rows: questions } = await pool.query(
    'SELECT * FROM survey_questions ORDER BY order_num'
  );
  const { rows: options } = await pool.query(
    'SELECT * FROM survey_options ORDER BY question_id, id'
  );
  return questions.map((q) => ({
    ...q,
    options: options.filter((o) => o.question_id === q.id),
  }));
}

async function saveResponses(sessionToken, answers) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const { questionId, optionId, textAnswer } of answers) {
      await client.query(
        `INSERT INTO survey_responses (session_token, question_id, option_id, text_answer)
         VALUES ($1, $2, $3, $4)`,
        [sessionToken, questionId, optionId || null, textAnswer || null]
      );
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function saveResult(sessionToken, recommendedCareers) {
  await pool.query(
    `INSERT INTO survey_results (session_token, recommended_careers) VALUES ($1, $2)`,
    [sessionToken, JSON.stringify(recommendedCareers)]
  );
}

async function getResultByToken(sessionToken) {
  const { rows } = await pool.query(
    'SELECT * FROM survey_results WHERE session_token = $1',
    [sessionToken]
  );
  if (!rows[0]) return null;
  return { ...rows[0], recommended_careers: JSON.parse(rows[0].recommended_careers) };
}

module.exports = { getQuestions, saveResponses, saveResult, getResultByToken };
