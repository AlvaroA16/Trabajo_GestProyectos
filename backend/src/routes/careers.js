const { Router } = require('express');
const { param } = require('express-validator');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/careersController');

const router = Router();

router.get('/', ctrl.list);
router.get('/fields', ctrl.listFields);
router.get('/:id', [param('id').isInt(), validate], ctrl.getById);
router.get('/:careerId/curriculum/:universityId', ctrl.getCurriculum);
router.get('/:careerId/compare', ctrl.compareUniversities);

module.exports = router;
