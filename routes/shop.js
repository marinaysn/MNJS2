const express = require('express');
const adminData = require("./admin")
const routes = express.Router()


routes.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {prods: products, docTitle: 'My Shopping List', path: '/shop', hasProducts: products.length > 0});

});


module.exports = routes;