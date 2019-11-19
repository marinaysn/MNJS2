const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { check, body } = require('express-validator');
const isAuth = require('../middleware/isAuth');

//edit products
  router.get('/editProduct/:productId', isAuth, adminController.getEditProduct );
  router.get('/editProduct', isAuth, adminController.getAddEditProduct );
  router.post('/editProduct', 
  [
    body('title', 'Please enter title')
    .trim()
    .isLength({ min: 3 })
    .isString()
    ,
    body('price', 'Enter valid number wit 2 decimal points')
    .trim()
    .isLength({ min: 1 })
    .isFloat()
    ,
    body('description', 'Description should be between 5 and 300 characters long')
    .trim()
    .isLength({ min: 5, max: 300 })
    .isString()
  ],
  isAuth, adminController.postEditProduct);

 //add Products
  router.post('/addProduct',
  [
    body('title', 'Please enter title')
    .trim()
    .isLength({ min: 3 })
    .isString()
    ,
    body('price', 'Enter valid number wit 2 decimal points')
    .trim()
    .isLength({ min: 1 })
    .isFloat()
    ,
    body('description', 'Description should be between 5 and 300 characters long')
    .trim()
    .isLength({ min: 5, max: 300 })
    .isString()
  ],
  isAuth, adminController.postAddProduct);

//list all product
  router.get('/adminProducts',  isAuth, adminController.getAdminProducts);
  router.get('/listOfProducts',  isAuth, adminController.displayAllProduct);

//delete
  //router.post('/deleteProduct', isAuth, adminController.postDeletedProduct);

  router.delete('/listOfProducts/:productId', isAuth, adminController.deleteProduct);
module.exports = router;


