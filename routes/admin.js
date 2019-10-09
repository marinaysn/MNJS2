const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/addProduct',productController.getAddProduct);
 
router.post('/addProduct', productController.postAddProduct);


module.exports = router;
