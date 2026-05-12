const { Router } = require('express');
const careersRouter = require('./careers');
const universitiesRouter = require('./universities');
const surveyRouter = require('./survey');
const workshopsRouter = require('./workshops');

const router = Router();

router.use('/careers', careersRouter);
router.use('/universities', universitiesRouter);
router.use('/survey', surveyRouter);
router.use('/workshops', workshopsRouter);

module.exports = router;
