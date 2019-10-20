const router = require('express').Router();
const controllers = require('../controllers/user_jobs.controller');

router.post('/', controllers.create);
router.patch('/:job_id/description', controllers.addDescription);
router.patch('/:job_id/requirement', controllers.addRequirement);

module.exports = router;
