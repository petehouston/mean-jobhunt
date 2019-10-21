const router = require('express').Router();
const controllers = require('../controllers/jobs.controllers');

router.get('/latest', controllers.getByLatest);
router.get('/:job_id', controllers.get);

module.exports = router;
