const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByEmail, create } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_in_prod';
const JWT_EXPIRES = '7d';

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, full_name: user.full_name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

const register = async (req, res) => {
  try {
    const { email, password, full_name, gender, age } = req.body;

    if (await findByEmail(email)) {
      return res.status(409).json({ message: 'El correo ya está registrado.' });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const user = await create({ email, password_hash, full_name, gender, age: Number(age) });
    const token = signToken(user);

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, full_name: user.full_name, gender: user.gender, age: user.age },
    });
  } catch (err) {
    console.error('register error:', err.message);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    }

    const token = signToken(user);
    res.json({
      token,
      user: { id: user.id, email: user.email, full_name: user.full_name, gender: user.gender, age: user.age },
    });
  } catch (err) {
    console.error('login error:', err.message);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

const me = (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, me };
