const express = require('express');
const routes = express.Router();
const directionController = require('../controllers/information')

// //use this fofr PUG template (uncomment)
routes.get('/direction', directionController.getDirectionController);

module.exports = routes;