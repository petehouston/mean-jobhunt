const router = require('express').Router();
const controllers = require('../controllers/jobs.controllers');

router.get('/latest', controllers.getByLatest);
router.get('/visa-sponsor', controllers.getByVisaSponsor);
router.get('/remote-jobs', controllers.getByRemote);
router.get('/high-salary', controllers.getByHighSalary);

router.get( '/:job_id', controllers.get);
router.post('/:job_id/apply', controllers.applyJob);

module.exports = router;

