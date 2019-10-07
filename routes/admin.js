const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

const products = [];

router.get('/addProduct',(req, res, next) => {

    // res.sendFile(path.join(rootDir, 'views', 'addProduct.html'));

     res.render('addProduct', {docTitle: 'Add Product'});

 });
 
 router.post('/addProduct', (req, res, next)=>{

     products.push({title: req.body.title});
     res.redirect(301, '/');
 });


exports.routes = router;
exports.products = products;
