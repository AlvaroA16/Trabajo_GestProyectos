const { Router } = require('express');
const { param, body } = require('express-validator');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/workshopsController');

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', [param('id').isInt(), validate], ctrl.getById);
router.post(
  '/:id/register',
  [
    param('id').isInt(),
    body('student_name').notEmpty().trim(),
    body('student_email').isEmail(),
    body('school_name').notEmpty().trim(),
    body('grade').isIn(['4to de Secundaria', '5to de Secundaria']),
    validate,
  ],
  ctrl.register
);

module.exports = router;
