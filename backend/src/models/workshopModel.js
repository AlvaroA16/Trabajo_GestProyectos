const { getPool, sql } = require('../config/database');

async function findAll({ grade, status } = {}) {
  const pool = await getPool();
  const req = pool.request();
  let where = 'WHERE 1=1';

  if (grade) {
    req.input('grade', sql.NVarChar, grade);
    where += ' AND target_grade = @grade';
  }
  if (status) {
    req.input('status', sql.NVarChar, status);
    where += ' AND status = @status';
  }

  const result = await req.query(`
    SELECT w.*,
      (SELECT COUNT(*) FROM workshop_registrations wr WHERE wr.workshop_id = w.id AND wr.status = 'confirmado') AS registered_count
    FROM workshops w ${where}
    ORDER BY w.date ASC, w.time_start ASC
  `);
  return result.recordset;
}

async function findById(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`
      SELECT w.*,
        (SELECT COUNT(*) FROM workshop_registrations wr WHERE wr.workshop_id = w.id AND wr.status = 'confirmado') AS registered_count
      FROM workshops w WHERE w.id = @id
    `);
  return result.recordset[0] || null;
}

async function register(workshopId, data) {
  const pool = await getPool();
  const { student_name, student_email, school_name, grade, phone } = data;
  const result = await pool.request()
    .input('workshopId', sql.Int, workshopId)
    .input('name', sql.NVarChar, student_name)
    .input('email', sql.NVarChar, student_email)
    .input('school', sql.NVarChar, school_name)
    .input('grade', sql.NVarChar, grade)
    .input('phone', sql.NVarChar, phone || null)
    .query(`
      INSERT INTO workshop_registrations (workshop_id, student_name, student_email, school_name, grade, phone, status)
      OUTPUT INSERTED.id
      VALUES (@workshopId, @name, @email, @school, @grade, @phone, 'confirmado')
    `);
  return result.recordset[0].id;
}

module.exports = { findAll, findById, register };
