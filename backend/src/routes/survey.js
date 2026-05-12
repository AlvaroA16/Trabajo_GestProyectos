const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/surveyController');

const router = Router();

router.get('/questions', ctrl.getQuestions);
router.post(
  '/responses',
  [body('answers').isArray({ min: 1 }).withMessage('Se requieren respuestas'), validate],
  ctrl.submitResponses
);
router.get('/results/:sessionToken', ctrl.getResult);

module.exports = router;
