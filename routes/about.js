const express = require('express');
const aboutController = require('../controllers/information')

const routes = express.Router()

routes.get('/about', aboutController.getAboutPageController);

  module.exports = routes;