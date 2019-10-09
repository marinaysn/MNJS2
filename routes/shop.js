const express = require('express');
const routes = express.Router()
const productController = require('../controllers/products');

routes.get('/', productController.displayProduct);

module.exports = routes;