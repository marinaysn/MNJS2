const express = require('express');
const adminData = require("./admin")
const routes = express.Router()


routes.get('/', (req, res, next) => {
    const products = adminData.products;

    // //use this fofr PUG template (uncomment)
    //res.render('shop', {prods: products, docTitle: 'My Shopping List', path: '/shop', hasProducts: products.length > 0});

    // //use this for HANDLEBARS template (uncomment)
    res.render('shop', {prods: products, docTitle: 'My Shopping List', path: '/shop', hasProducts: products.length > 0, activeShop: true, productCSS: true});
});


module.exports = routes;