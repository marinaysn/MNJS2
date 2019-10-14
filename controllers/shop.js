//const products = []; //use Model instead
const Product = require('../models/product');


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

exports.postToCart = (req, res, next) => {
    const prodId = req.body.productId;

    console.log(prodId);
    res.redirect('/cart')
}

exports.getCheckOut = (req, res, next) =>{
    res.render('admin/checkout', { docTitle: 'Checkout', path: '/checkout', activeDirection: true })
}

exports.displayProduct = (req, res, next) => {

    const products = Product.fetchAll((products) => {

        // //use this for HANDLEBARS and EJS template (uncomment)
        res.render('shop/productList',
            {
                prods: products,
                docTitle: 'All Products',
                path: '/productList',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
    });
};

exports.getProductByID  = (req, res, next) =>{
    const productId = req.params.productId;
    console.log(productId)
    Product.findById(productId, product =>{
        console.log(product)
   
    res.render('shop/productDetails', { docTitle: product.title, path: '/productDetails', prod: product, activeDirection: true })

     });
}


exports.getIndex = (req, res, next) =>{
    const products = Product.fetchAll((products) => {
        res.render('shop/index',
            {
                prods: products,
                docTitle: 'Main Page',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
    }); 
}

exports.getMyOrders  = (req, res, next) =>{
    res.render('shop/orders', { docTitle: 'My Orders', path: '/orders', activeDirection: true })
}





