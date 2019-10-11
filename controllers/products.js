//const products = []; //use Model instead
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // //use this for HANDLEBARS and EJS template (comment)
    res.render('admin/addProduct', { docTitle: 'Add Product', path: '/admin/addProduct', activeAddProduct: true, productCSS: true });
}

exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title});

    const product = new Product(req.body.title);
    product.save();
    res.redirect(301, '/');
}

exports.displayProduct = (req, res, next) => {

    const products = Product.fetchAll((products) => {

        // //use this for HANDLEBARS and EJS template (uncomment)
        res.render('shop/productList',
            {
                prods: products,
                docTitle: 'My Shopping List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
    });


};

