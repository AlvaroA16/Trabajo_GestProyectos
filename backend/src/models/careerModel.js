const pool = require('../config/database');

async function findAll({ field, search } = {}) {
  const params = [];
  let where = 'WHERE 1=1';

  if (field) {
    params.push(field);
    where += ` AND field = $${params.length}`;
  }
  if (search) {
    params.push(`%${search}%`);
    where += ` AND name ILIKE $${params.length}`;
  }

  const { rows } = await pool.query(`SELECT * FROM careers ${where} ORDER BY name`, params);
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM careers WHERE id = $1', [id]);
  return rows[0] || null;
}

async function findFields() {
  const { rows } = await pool.query('SELECT DISTINCT field FROM careers ORDER BY field');
  return rows.map((r) => r.field);
}

async function findCurriculum(careerId, universityId) {
  const { rows } = await pool.query(`
    SELECT cc.*, cu.total_credits, cu.duration_semesters
    FROM curriculum_courses cc
    JOIN career_university cu ON cc.career_university_id = cu.id
    WHERE cu.career_id = $1 AND cu.university_id = $2
    ORDER BY cc.semester, cc.course_name
  `, [careerId, universityId]);
  return rows;
}

module.exports = { findAll, findById, findFields, findCurriculum };
