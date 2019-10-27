const express = require('express');
const routes = express.Router();
const logIncontroller = require('../controllers/security');

routes.get('/login', logIncontroller.getLogInController);

module.exports = routes;