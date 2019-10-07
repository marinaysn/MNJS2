const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const routes = express.Router()

routes.get('/about',(req, res, next) => {
     // res.sendFile(path.join(rootDir, 'views', 'about.html'));

     // //use this fofr PUG template (uncomment)
     //res.render('about', {docTitle: 'About Us', path: '/about'})

     // //use this for PUG template (uncomment)
     res.render('about', {docTitle: 'About Us', path: '/about', activeAbout: true})

  });

  module.exports = routes;