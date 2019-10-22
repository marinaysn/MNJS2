const Product = require('../models/product');
// const Order = require('../models/order');

exports.displayProduct = (req, res, next) => {

    Product.fetchAll().then(products => {
        res.render('shop/productList',
            {
                prods: products,
                docTitle: 'All Products',
                path: '/productList',
                hasProducts: products.length > 0,
            });
    }).catch(err => console.log(err))
};

//getProduct
exports.getProductByID = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then((product) => {
            res.render('shop/productDetails',
                {
                    docTitle: product.title,
                    path: '/productDetails',
                    prod: product,
                    activeDirection: true
                })
        }
        ).catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {

    Product.fetchAll().then(products => {
        res.render('shop/index',
            {
                prods: products,
                docTitle: 'Main Page',
                path: '/',
                hasProducts: products.length > 0

            });
    })
        .catch(err => console.log(err))
}

//getProducts
exports.getMyCartView = (req, res, next) => {

    Product.fetchAll().then(products => {
        res.render('shop/cart',
            {
                prods: products,
                docTitle: 'My Shopping List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
    })
        .catch(err => console.log(err))


};

exports.getMyCart = (req, res, next) => {
    res.render('shop/cart', { docTitle: 'My Cart', path: '/cart', activeDirection: true })
}

exports.postToCart = (req, res, next) => {
    const prodId = req.body.productId;
   
    Product.findById(prodId)
    .then( product =>{
       return req.user.addToCart(product) 
    })
    .then(result =>{
        res.redirect('/cart')
    })
    .catch(err =>{console.log(err)})
}
//getCart
exports.getCart = (req, res, next) => {

    req.user
        .getCart()
        .then(products => {
               res.render('shop/cart',
                        {
                            docTitle: 'All Products',
                            path: '/cart',
                            prods: products
                        });
                })
                .catch(err => console.log(err));
        ;
};

exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
     const qty = req.body.productQty;
    let cartId = 0;

    req.user.deleteItemFromCart(prodId)
    .then(result =>{
        res.redirect('/cart')
    })
    .catch(err => console.log(err));

}

//post Order
exports.postOrder = (req, res, next) =>{

    req.user.addOrder()
    .then( result =>{
           res.redirect('/orders');
       })
    .catch(err => console.log(err))
}

// show Orders
exports.getMyOrders = (req, res, next) => {
    req.user.getOrders()
        .then(orders =>{

            res.render('shop/orders', 
            {docTitle: 'My Orders', 
            path: '/orders', 
            orders: orders  })
        })
        .catch(err => console.log(err))


    
}

