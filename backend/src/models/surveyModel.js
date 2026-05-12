const { getPool, sql } = require('../config/database');

async function getQuestions() {
  const pool = await getPool();
  const questionsResult = await pool.request()
    .query('SELECT * FROM survey_questions ORDER BY order_num');
  const questions = questionsResult.recordset;

  const optionsResult = await pool.request()
    .query('SELECT * FROM survey_options ORDER BY question_id, id');
  const options = optionsResult.recordset;

  return questions.map((q) => ({
    ...q,
    options: options.filter((o) => o.question_id === q.id),
  }));
}

async function saveResponses(sessionToken, answers) {
  const pool = await getPool();
  const tx = pool.transaction();
  await tx.begin();

  try {
    for (const { questionId, optionId, textAnswer } of answers) {
      await tx.request()
        .input('token', sql.NVarChar, sessionToken)
        .input('questionId', sql.Int, questionId)
        .input('optionId', sql.Int, optionId || null)
        .input('textAnswer', sql.NVarChar, textAnswer || null)
        .query(`
          INSERT INTO survey_responses (session_token, question_id, option_id, text_answer)
          VALUES (@token, @questionId, @optionId, @textAnswer)
        `);
    }
    await tx.commit();
  } catch (err) {
    await tx.rollback();
    throw err;
  }
}

async function saveResult(sessionToken, recommendedCareers) {
  const pool = await getPool();
  await pool.request()
    .input('token', sql.NVarChar, sessionToken)
    .input('careers', sql.NVarChar, JSON.stringify(recommendedCareers))
    .query(`
      INSERT INTO survey_results (session_token, recommended_careers)
      VALUES (@token, @careers)
    `);
}

async function getResultByToken(sessionToken) {
  const pool = await getPool();
  const result = await pool.request()
    .input('token', sql.NVarChar, sessionToken)
    .query('SELECT * FROM survey_results WHERE session_token = @token');
  const row = result.recordset[0];
  if (!row) return null;
  return { ...row, recommended_careers: JSON.parse(row.recommended_careers) };
}

module.exports = { getQuestions, saveResponses, saveResult, getResultByToken };
