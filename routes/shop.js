const express = require('express');

const routes = express.Router()


routes.get('/',(req, res, next) => {
    //  console.log('In another middleware')
      res.send('<h1>Hello from Express</h1>');
  });

  module.exports = routes;