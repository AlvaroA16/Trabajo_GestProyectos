const pool = require('../config/database');

const findByEmail = async (email) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE LOWER(email) = LOWER($1)',
    [email]
  );
  return rows[0] || null;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
};

const create = async ({ email, password_hash, full_name, gender, age }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, full_name, gender, age)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, full_name, gender, age, created_at`,
    [email, password_hash, full_name, gender, age]
  );
  return rows[0];
};

module.exports = { findByEmail, findById, create };
