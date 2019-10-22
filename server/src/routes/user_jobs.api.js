const router = require('express').Router();
const controllers = require('../controllers/user_jobs.controller');

router.post('/', controllers.create);
router.patch('/:job_id/description', controllers.addDescription);
router.patch('/:job_id/requirement', controllers.addRequirement);

router.get('/', controllers.list);
router.get('/:job_id', controllers.getInfo);
router.patch('/:job_id', controllers.edit);
router.patch('/:job_id/publish', controllers.publish);
router.patch('/:job_id/unpublish', controllers.unpublish);
router.get('/:job_id/applications', controllers.getJobApps);

module.exports = router;
