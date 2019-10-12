const express = require('express');
const cartController = require('../controllers/products')

const routes = express.Router()

routes.get('/cart', cartController.getMyCart);

  module.exports = routes;