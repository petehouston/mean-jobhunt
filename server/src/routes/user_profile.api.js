const router = require("express").Router();
const controllers = require('../controllers/user_profile.controller');

router.get('/', controllers.getProfile);

module.exports = router;