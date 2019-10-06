const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

const products = [];

router.get('/addProduct',(req, res, next) => {
    // console.log('In another middleware')
     res.sendFile(path.join(rootDir, 'views', 'addProduct.html'));
 });
 
 router.post('/addProduct', (req, res, next)=>{
    //  console.log("1*******************");
    //  console.log(req.body);
     products.push({title: req.body.title});
    //  console.log("2*******************");
    //  console.log(products[0].title);
    //  console.log(products);
     res.redirect(301, '/');
 });

//  module.exports = router;
exports.routes = router;
exports.products = products;
