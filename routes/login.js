const express = require('express');
const routes = express.Router();
const logIncontroller = require('../controllers/security');

routes.get('/login', logIncontroller.getLogInController);

 //LogIn
 routes.post('/login', logIncontroller.postLogInController);

  //LogOut
  routes.post('/logout', logIncontroller.postLogOut);


module.exports = routes;

