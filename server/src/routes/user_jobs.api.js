const router = require('express').Router();
const controllers = require('../controllers/user_jobs.controller');

router.post('/', controllers.create);

module.exports = router;
