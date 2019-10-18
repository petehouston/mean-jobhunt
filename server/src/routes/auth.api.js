const Router = require('express').Router;
const controllers = require('../controllers/auth.controller');

const routes = Router();

routes.get('/login', controllers.login);
routes.get('/register', controllers.register);

module.exports = routes;
