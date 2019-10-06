const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const routes = express.Router()

routes.get('/about',(req, res, next) => {
      res.sendFile(path.join(rootDir, 'views', 'about.html'));
  });

  module.exports = routes;