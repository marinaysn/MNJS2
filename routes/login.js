const express = require('express');
const routes = express.Router();
const logIncontroller = require('../controllers/security');
//const expValidator = require('express-validator/check');
const { check,body } = require('express-validator');
//LogIn
routes.get('/login', logIncontroller.getLogInController);
routes.post('/login', logIncontroller.postLogInController);

//LogOut
routes.post('/logout', logIncontroller.postLogOut);

//signup
routes.get('/signup', logIncontroller.getSignUp);
routes.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((value, { req }) => {

        console.log('------------------')
        console.log(value)

        let regex = /tests.com/i;
        let result = regex.test(value);
        console.log(result);

        if (result) {

          throw new Error(`${value} Email Address is Reserved`)
        }
        return true;
      }),

      body('password', 'Password should be at least 6 characters long and have only letters or numbers')
      .isLength({min:5})
      .isAlphanumeric(),

      body('confirmPassword')
      .custom((value, {req}) =>{
        if(value !== req.body.password){
          throw new Error('Passwords you entered do not match')
        }
      })
  ],
  logIncontroller.postSignUp);

//reset
routes.get('/reset', logIncontroller.getResetPassword);
routes.post('/reset', logIncontroller.postResetPassword);
routes.get('/reset/:token', logIncontroller.getNewPassword);
routes.post('/passwordReset', logIncontroller.postNewPassword);

module.exports = routes;

