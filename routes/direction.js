const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const routes = express.Router()


routes.get('/direction',(req, res, next) => {
     // res.sendFile(path.join(rootDir, 'views', 'direction.html'));
      res.render('direction', {docTitle: 'How To Find Us', path: '/direction'})
  });

  module.exports = routes;