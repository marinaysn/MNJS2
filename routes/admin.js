const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// //edit products
 router.get('/editProduct/:productId', adminController.getEditProduct );
 router.get('/editProduct', adminController.getAddEditProduct );
 router.post('/editProduct', adminController.postEditProduct);

 //add Products
 router.post('/addProduct', adminController.postAddProduct);

 //list all product
 router.get('/adminProducts', adminController.getAdminProducts);
 router.get('/listOfProducts', adminController.displayAllProduct);

 //delete
 router.post('/deleteProduct', adminController.postDeletedProduct);

module.exports = router;
