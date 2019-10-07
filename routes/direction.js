const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const routes = express.Router()

// //use this fofr PUG template (uncomment)
routes.get('/direction', (req, res, next) => {

     // //use this fofr PUG template (uncomment)
    //res.render('direction', {docTitle: 'How To Find Us', path: '/direction'})

    // //use this for HANDLEBARS template (uncomment)
    res.render('direction', { docTitle: 'How To Find Us', path: '/direction', activeDirection: true })
});

module.exports = routes;