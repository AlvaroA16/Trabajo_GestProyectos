const universityModel = require('../models/universityModel');

async function list(req, res, next) {
  try {
    const { type, region } = req.query;
    const universities = await universityModel.findAll({ type, region });
    res.json({ universities });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const university = await universityModel.findById(Number(req.params.id));
    if (!university) return res.status(404).json({ message: 'Universidad no encontrada' });
    res.json({ university });
  } catch (err) { next(err); }
}

async function listByCareer(req, res, next) {
  try {
    const universities = await universityModel.findByCareer(Number(req.params.careerId));
    res.json({ universities });
  } catch (err) { next(err); }
}

module.exports = { list, getById, listByCareer };
