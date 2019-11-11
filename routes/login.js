const express = require('express');
const routes = express.Router();
const logIncontroller = require('../controllers/security');
//const expValidator = require('express-validator/check');
const { check, body } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

//LogIn
routes.get('/login', logIncontroller.getLogInController);
routes.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((value, { req }) => {

        return User.findOne({ email: value })
          .then(user => {

            if (!user) {
              
              return Promise.reject('Invalid Email. Please check your email and try again');
            }

            return true;
          })
      })
    ,
    body('password', 'Password is Incorrect. Please try again')
      .isLength({ min: 5 })
      .isAlphanumeric()
      
  ],
  logIncontroller.postLogInController);

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

        // let regex = /tests.com/i;
        // let result = regex.test(value);
        // if (result) {

        //   throw new Error(`${value} Email Address is Reserved`)
        // }
        // return true;

        return User.findOne({ email: value })
          .then(userDoc => {

            if (userDoc) {
              //throw 'Email Already Exists. Please choose different email or login'
              return Promise.reject('Email already exists');
            }
          });
      })
    ,
    body('password', 'Password should be at least 6 characters long and have only letters or numbers')
      .isLength({ min: 5 })
      .isAlphanumeric()
    ,
    body('confirmPassword')
      .custom((value, { req }) => {

        if (value.toString() !== req.body.password.toString()) {
          throw new Error('Passwords you entered do not match')
        }

        return true;
      })
  ],
  logIncontroller.postSignUp);

//reset
routes.get('/reset', logIncontroller.getResetPassword);
routes.post('/reset', logIncontroller.postResetPassword);
routes.get('/reset/:token', logIncontroller.getNewPassword);
routes.post('/passwordReset', logIncontroller.postNewPassword);

module.exports = routes;

