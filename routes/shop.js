const express = require('express');
const router = express.Router()
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/isAuth');

 router.get('/', shopController.getIndex);

// //cart
  router.get('/cart', isAuth, shopController.getCart);
 router.post('/cart', isAuth, shopController.postToCart);

// //productlist
 router.get('/productList', shopController.displayProduct);
 router.get('/productList/:productId', shopController.getProductByID);

 
// //orders
  router.get('/orders',  isAuth, shopController.getMyOrders);
  router.post('/checkout', isAuth, shopController.postOrder);
  router.get('/orders/:orderId', isAuth, shopController.getInvoice);

// //delteing
 router.post('/cartDeleteItem', isAuth, shopController.postCartDeleteItem);

 //checkout
 router.get('/checkout', isAuth, shopController.getCheckout)
 router.get('/checkout/success', isAuth, shopController.getCheckout)
 router.get('/checkout/cancel', isAuth, shopController.getCheckoutSuccess)

module.exports = router;