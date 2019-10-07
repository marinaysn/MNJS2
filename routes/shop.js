const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const adminData = require("./admin")
const routes = express.Router()


routes.get('/', (req, res, next) => {
    console.log("3*******************");
    console.log(adminData.products)

    const products = adminData.products;

    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {prods: products, docTitle: 'My Shopping List'});

});


module.exports = routes;