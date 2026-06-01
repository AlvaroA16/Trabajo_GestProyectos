const pool = require('../config/database');

async function findAll({ grade, status } = {}) {
  const params = [];
  let where = 'WHERE 1=1';

  if (grade) {
    params.push(grade);
    where += ` AND target_grade = $${params.length}`;
  }
  if (status) {
    params.push(status);
    where += ` AND status = $${params.length}`;
  }

  const { rows } = await pool.query(`
    SELECT w.*,
      (SELECT COUNT(*) FROM workshop_registrations wr
       WHERE wr.workshop_id = w.id AND wr.status = 'confirmado') AS registered_count
    FROM workshops w ${where}
    ORDER BY w.date ASC, w.time_start ASC
  `, params);
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(`
    SELECT w.*,
      (SELECT COUNT(*) FROM workshop_registrations wr
       WHERE wr.workshop_id = w.id AND wr.status = 'confirmado') AS registered_count
    FROM workshops w WHERE w.id = $1
  `, [id]);
  return rows[0] || null;
}

async function register(workshopId, data) {
  const { student_name, student_email, school_name, grade, phone } = data;
  const { rows } = await pool.query(`
    INSERT INTO workshop_registrations
      (workshop_id, student_name, student_email, school_name, grade, phone, status)
    VALUES ($1, $2, $3, $4, $5, $6, 'confirmado')
    RETURNING id
  `, [workshopId, student_name, student_email, school_name, grade, phone || null]);
  return rows[0].id;
}

module.exports = { findAll, findById, register };
