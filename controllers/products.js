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


exports.getMyCartView = (req, res, next) => {

    const products = Product.fetchAll((products) => {

        // //use this for HANDLEBARS and EJS template (uncomment)
        res.render('shop/cart',
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

exports.getMyCart = (req, res, next) =>{
    res.render('shop/cart', { docTitle: 'My Cart', path: '/cart', activeDirection: true })
}

exports.getCatalog = (req, res, next) =>{
    res.render('admin/listOfProducts', { docTitle: 'List Of Products', path: '/listOfProducts', activeDirection: true })
}

exports.getAdminProducts = (req, res, next) =>{
    res.render('admin/adminProducts', { docTitle: 'List Of Products', path: '/adminProducts', activeDirection: true })
}

exports.getCheckOut = (req, res, next) =>{
    res.render('admin/checkout', { docTitle: 'Checkout', path: '/checkout', activeDirection: true })
}





