const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const routes = express.Router()


routes.get('/login',(req, res, next) => {
      
      // //use this for PUG template (uncomment)
        // res.render('login', {docTitle: 'Sign In', path: '/login'})

      // //use this for HANDLEBARS template (uncomment)
      res.render('login', {docTitle: 'Sign In', path: '/login' , activeLogIn: true , productCSS: true})
    });

  module.exports = routes;