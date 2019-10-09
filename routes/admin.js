const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/addProduct',productController.getAddProduct);
 
router.post('/addProduct', productController.postAddProduct);


module.exports = router;
