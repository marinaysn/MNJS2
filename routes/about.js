const express = require('express');
const infoController = require('../controllers/information')

const routes = express.Router()

routes.get('/about', infoController.getAboutPageController);

routes.get('/direction', infoController.getDirectionController);
  module.exports = routes;