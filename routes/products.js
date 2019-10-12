const express = require('express');
const adminProductsController = require('../controllers/products')

const routes = express.Router()

routes.get('/adminProducts', adminProductsController.getMyCart);

  module.exports = routes;