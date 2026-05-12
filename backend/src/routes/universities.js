const { Router } = require('express');
const { param } = require('express-validator');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/universitiesController');

const router = Router();

router.get('/', ctrl.list);
router.get('/by-career/:careerId', ctrl.listByCareer);
router.get('/:id', [param('id').isInt(), validate], ctrl.getById);

module.exports = router;
