const express = require('express');
const adminData = require("./admin")
const routes = express.Router()


routes.get('/', (req, res, next) => {
    const products = adminData.products;

    // //use this for HANDLEBARS and EJS template (uncomment)
    res.render('shop', {prods: products, docTitle: 'My Shopping List', path: '/shop', hasProducts: products.length > 0, activeShop: true, productCSS: true});
});


module.exports = routes;