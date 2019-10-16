const express = require('express');
const router = express.Router()
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/productList', shopController.displayProduct);

router.get('/cart', shopController.displayAllProductInCart);

router.post('/cart', shopController.postToCart);

router.get('/checkout', shopController.getCheckOut);

router.get('/productList/:productId', shopController.getProductByID);

router.get('/orders', shopController.getMyOrders);

router.post('/cartDeleteItem', shopController.postcartDeleteItem)
module.exports = router;