const router = require("express").Router();
const controllers = require('../controllers/user_profile.controller');

router.get('/', controllers.getProfile);
router.patch('/change-password', controllers.changePassword);

module.exports = router;
