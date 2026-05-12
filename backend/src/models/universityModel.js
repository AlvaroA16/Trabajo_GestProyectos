const { getPool, sql } = require('../config/database');

async function findAll({ type, region } = {}) {
  const pool = await getPool();
  const req = pool.request();
  let where = 'WHERE 1=1';

  if (type) {
    req.input('type', sql.NVarChar, type);
    where += ' AND type = @type';
  }
  if (region) {
    req.input('region', sql.NVarChar, region);
    where += ' AND location_region = @region';
  }

  const result = await req.query(`SELECT * FROM universities ${where} ORDER BY name`);
  return result.recordset;
}

async function findById(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM universities WHERE id = @id');
  return result.recordset[0] || null;
}

async function findByCareer(careerId) {
  const pool = await getPool();
  const result = await pool.request()
    .input('careerId', sql.Int, careerId)
    .query(`
      SELECT u.*, cu.total_credits, cu.duration_semesters
      FROM universities u
      JOIN career_university cu ON u.id = cu.university_id
      WHERE cu.career_id = @careerId
      ORDER BY u.name
    `);
  return result.recordset;
}

module.exports = { findAll, findById, findByCareer };
