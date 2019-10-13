const express = require('express');
const router = express.Router()
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getMyCart);

router.get('/checkout', shopController.getCheckOut);

router.get('/productList/:productId', shopController.getProductByID);

router.get('/orders', shopController.getMyOrders);

module.exports = router;