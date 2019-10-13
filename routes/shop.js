const express = require('express');
const router = express.Router()
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getMyCart);

router.get('/checkout', shopController.getCheckOut);

router.get('/productList', shopController.displayProduct);

router.get('/orders', shopController.getMyOrders);

module.exports = router;