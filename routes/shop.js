const express = require('express');
const router = express.Router()
const shopController = require('../controllers/shop');

 router.get('/', shopController.getIndex);

// //cart
  router.get('/cart', shopController.getCart);
 router.post('/cart', shopController.postToCart);

// //productlist
 router.get('/productList', shopController.displayProduct);
 router.get('/productList/:productId', shopController.getProductByID);

 
// //orders
  router.get('/orders', shopController.getMyOrders);
  router.post('/checkout', shopController.postOrder);

// //delteing
 router.post('/cartDeleteItem', shopController.postCartDeleteItem);


module.exports = router;