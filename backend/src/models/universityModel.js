const pool = require('../config/database');

async function findAll({ type, region } = {}) {
  const params = [];
  let where = 'WHERE 1=1';

  if (type) {
    params.push(type);
    where += ` AND type = $${params.length}`;
  }
  if (region) {
    params.push(region);
    where += ` AND location_region = $${params.length}`;
  }

  const { rows } = await pool.query(`SELECT * FROM universities ${where} ORDER BY name`, params);
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM universities WHERE id = $1', [id]);
  return rows[0] || null;
}

async function findByCareer(careerId) {
  const { rows } = await pool.query(`
    SELECT u.*, cu.total_credits, cu.duration_semesters
    FROM universities u
    JOIN career_university cu ON u.id = cu.university_id
    WHERE cu.career_id = $1
    ORDER BY u.name
  `, [careerId]);
  return rows;
}

module.exports = { findAll, findById, findByCareer };
