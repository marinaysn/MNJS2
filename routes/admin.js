const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

const products = [];

router.get('/addProduct',(req, res, next) => {

    // res.sendFile(path.join(rootDir, 'views', 'addProduct.html'));

    // //use this fofr PUG template (uncomment)
    // res.render('addProduct', {docTitle: 'Add Product', path: '/admin/addProduct'});

    // //use this for HANDLEBARS template (uncomment)
    // res.render('addProduct', {docTitle: 'Add Product', path: '/admin/addProduct', activeAddProduct: true, productCSS: true});

    // //use this for HANDLEBARS and EJS template (comment)
    res.render('addProduct', {docTitle: 'Add Product', path: '/admin/addProduct', activeAddProduct: true, productCSS: true});

 });
 
 router.post('/addProduct', (req, res, next)=>{

     products.push({title: req.body.title});
     res.redirect(301, '/');
 });


exports.routes = router;
exports.products = products;
