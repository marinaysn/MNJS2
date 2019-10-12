const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/addProduct', adminController.getAddProduct);
 
router.post('/addProduct', adminController.postAddProduct);

router.get('/adminProducts', adminController.getAdminProducts);

router.get('/listOfProducts', adminController.displayAllProduct);

module.exports = router;
