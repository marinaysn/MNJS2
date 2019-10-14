const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');



router.get('/editProduct/:productId', adminController.getEditProduct );

 router.get('/editProduct', adminController.getAddEditProduct );
 
router.post('/addProduct', adminController.postAddProduct);

router.get('/adminProducts', adminController.getAdminProducts);

router.get('/listOfProducts', adminController.displayAllProduct);

module.exports = router;
