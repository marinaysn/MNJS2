const express = require('express');
const catalogController = require('../controllers/products')

const routes = express.Router()

routes.get('/listOfProducts', catalogController.getCatalog);

  module.exports = routes;