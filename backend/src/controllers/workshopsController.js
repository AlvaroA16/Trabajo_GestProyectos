const workshopModel = require('../models/workshopModel');

async function list(req, res, next) {
  try {
    const { grade, status } = req.query;
    const workshops = await workshopModel.findAll({ grade, status });
    res.json({ workshops });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const workshop = await workshopModel.findById(Number(req.params.id));
    if (!workshop) return res.status(404).json({ message: 'Taller no encontrado' });
    res.json({ workshop });
  } catch (err) { next(err); }
}

async function register(req, res, next) {
  try {
    const workshopId = Number(req.params.id);
    const workshop = await workshopModel.findById(workshopId);

    if (!workshop) return res.status(404).json({ message: 'Taller no encontrado' });

    const spotsLeft = workshop.capacity - (workshop.registered_count || 0);
    if (spotsLeft <= 0) return res.status(409).json({ message: 'No hay cupos disponibles' });

    const registrationId = await workshopModel.register(workshopId, req.body);
    res.status(201).json({ message: 'Inscripción exitosa', registrationId });
  } catch (err) { next(err); }
}

module.exports = { list, getById, register };
