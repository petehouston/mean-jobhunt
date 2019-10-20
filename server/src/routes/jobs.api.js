const router = require('express').Router();
const controllers = require('../controllers/jobs.controllers');

router.get('/:job_id', controllers.get);

module.exports = router;
