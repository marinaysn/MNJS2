const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

const isAuth = require('../middleware/isAuth');

//edit products
  router.get('/editProduct/:productId', isAuth, adminController.getEditProduct );
  router.get('/editProduct',  isAuth, adminController.getAddEditProduct );
  router.post('/editProduct', isAuth, adminController.postEditProduct);

 //add Products
  router.post('/addProduct', isAuth, adminController.postAddProduct);

//list all product
  router.get('/adminProducts',  isAuth, adminController.getAdminProducts);
  router.get('/listOfProducts',  isAuth, adminController.displayAllProduct);

//delete
  router.post('/deleteProduct', isAuth, adminController.postDeletedProduct);

module.exports = router;
