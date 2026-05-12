const careerModel = require('../models/careerModel');
const universityModel = require('../models/universityModel');

async function list(req, res, next) {
  try {
    const { field, search } = req.query;
    const careers = await careerModel.findAll({ field, search });
    res.json({ careers });
  } catch (err) { next(err); }
}

async function listFields(req, res, next) {
  try {
    const fields = await careerModel.findFields();
    res.json({ fields });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const career = await careerModel.findById(Number(req.params.id));
    if (!career) return res.status(404).json({ message: 'Carrera no encontrada' });
    res.json({ career });
  } catch (err) { next(err); }
}

async function getCurriculum(req, res, next) {
  try {
    const { careerId, universityId } = req.params;
    const courses = await careerModel.findCurriculum(Number(careerId), Number(universityId));
    res.json({ courses });
  } catch (err) { next(err); }
}

async function compareUniversities(req, res, next) {
  try {
    const { careerId } = req.params;
    const universityIds = req.query.universities?.split(',').map(Number) || [];

    if (universityIds.length < 2) {
      return res.status(400).json({ message: 'Se requieren al menos 2 universidades para comparar' });
    }

    const comparison = await Promise.all(
      universityIds.map(async (uId) => {
        const university = await universityModel.findById(uId);
        const courses = await careerModel.findCurriculum(Number(careerId), uId);
        return { university, courses };
      })
    );

    res.json({ comparison });
  } catch (err) { next(err); }
}

module.exports = { list, listFields, getById, getCurriculum, compareUniversities };
