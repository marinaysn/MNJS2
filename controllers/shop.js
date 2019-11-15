const Product = require('../models/product');
const Order = require('../models/order');

//mongoose
exports.displayProduct = (req, res, next) => {

    Product.find().then(products => {
        res.render('shop/productList',
            {
                prods: products,
                docTitle: 'All Products',
                path: '/productList',
                hasProducts: products.length > 0
                , isLoggedIn: req.session.user ? true : false
            });
    }).catch(err => {
        let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
        const error = new Error(str)
            error.httpStatusCode = 500;
            return next(error);
    });
};

//mongoose
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
                    , isLoggedIn: req.session.user ? true : false
                })
        }
        ).catch(err => {
            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
                error.httpStatusCode = 500;
                return next(error);
        });
}

//mongoose
exports.getIndex = (req, res, next) => {

    Product.find().then(products => {
        res.render('shop/index',
        
            {
                prods: products,
                docTitle: 'Main Page',
                path: '/',
                hasProducts: products.length > 0
               
            });
    }).catch(err => {
        let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
        const error = new Error(str)
            error.httpStatusCode = 500;
            return next(error);
    });
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
                , isLoggedIn: req.session.user ? true : false
            });
    }).catch(err => {
        let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
        const error = new Error(str)
            error.httpStatusCode = 500;
            return next(error);
    });


};

exports.getMyCart = (req, res, next) => {
    res.render('shop/cart', { docTitle: 'My Cart', path: '/cart', activeDirection: true, isLoggedIn: req.session.user ? true : false })
}

exports.postToCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => {
            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
                error.httpStatusCode = 500;
                return next(error);
        });
}
//getCart
exports.getCart = (req, res, next) => {

    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items
            res.render('shop/cart',
                {
                    docTitle: 'All Products',
                    path: '/cart',
                    prods: products
                    , isLoggedIn: req.session.user ? true : false
                });
        })
        .catch(err => {
            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
                error.httpStatusCode = 500;
                return next(error);
        });
};

exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    const qty = req.body.productQty;
    let cartId = 0;

    req.user.deleteItemFromCart(prodId)
        .then(result => {

            res.redirect('/cart')
        })
        .catch(err => {
            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
                error.httpStatusCode = 500;
                return next(error);
        });

}

//post Order
exports.postOrder = (req, res, next) => {

    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {

            const products = user.cart.items.map( i=> {
                return {quantity: i.quantity, product: {...i.productId._doc} }
            });

            const order = new Order({
                user: {
                    name: req.user.name,
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });

            order.save();
            
        }).then(result => {
           return req.user.clearCart();
           
        }).then(result => {
            res.redirect('/orders');
        })
        .catch(err => {
            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
                error.httpStatusCode = 500;
                return next(error);
        });
}

// show Orders
exports.getMyOrders = (req, res, next) => {

    Order.find({'user.userId': req.user._id})
    .then(orders => {

            res.render('shop/orders',
                {
                    docTitle: 'My Orders',
                    path: '/orders',
                    orders: orders
                    , isLoggedIn: req.session.user ? true : false
                })
        })
        .catch(err => {
            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
                error.httpStatusCode = 500;
                return next(error);
        });

}

