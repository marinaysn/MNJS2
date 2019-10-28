const express = require('express');
const routes = express.Router();
const logIncontroller = require('../controllers/security');

routes.get('/login', logIncontroller.getLogInController);

 //add Products
 routes.post('/login', logIncontroller.postLogInController);

module.exports = routes;

