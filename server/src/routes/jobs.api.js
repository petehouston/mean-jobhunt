const router = require('express').Router();
const controllers = require('../controllers/jobs.controllers');

router.get('/:job_id', controllers.get);
router.get('/latest', controllers.getByLatest);

module.exports = router;
