const { getPool, sql } = require('../config/database');

async function findAll({ field, search } = {}) {
  const pool = await getPool();
  const req = pool.request();
  let where = 'WHERE 1=1';

  if (field) {
    req.input('field', sql.NVarChar, field);
    where += ' AND field = @field';
  }
  if (search) {
    req.input('search', sql.NVarChar, `%${search}%`);
    where += ' AND name LIKE @search';
  }

  const result = await req.query(`SELECT * FROM careers ${where} ORDER BY name`);
  return result.recordset;
}

async function findById(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM careers WHERE id = @id');
  return result.recordset[0] || null;
}

async function findFields() {
  const pool = await getPool();
  const result = await pool.request().query('SELECT DISTINCT field FROM careers ORDER BY field');
  return result.recordset.map((r) => r.field);
}

async function findCurriculum(careerId, universityId) {
  const pool = await getPool();
  const result = await pool.request()
    .input('careerId', sql.Int, careerId)
    .input('universityId', sql.Int, universityId)
    .query(`
      SELECT cc.*, cu.total_credits, cu.duration_semesters
      FROM curriculum_courses cc
      JOIN career_university cu ON cc.career_university_id = cu.id
      WHERE cu.career_id = @careerId AND cu.university_id = @universityId
      ORDER BY cc.semester, cc.course_name
    `);
  return result.recordset;
}

module.exports = { findAll, findById, findFields, findCurriculum };
