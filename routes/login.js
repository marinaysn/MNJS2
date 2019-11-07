const express = require('express');
const routes = express.Router();
const logIncontroller = require('../controllers/security');

routes.get('/login', logIncontroller.getLogInController);

 //LogIn
 routes.post('/login', logIncontroller.postLogInController);

  //LogOut
  routes.post('/logout', logIncontroller.postLogOut);

  routes.get('/signup', logIncontroller.getSignUp);
  routes.post('/signup', logIncontroller.postSignUp);

  routes.get('/reset', logIncontroller.getResetPassword);

  routes.post('/reset', logIncontroller.postResetPassword);

  routes.get('/reset/:token', logIncontroller.getNewPassword);
  routes.post('/passwordReset', logIncontroller.postNewPassword);
  
module.exports = routes;

