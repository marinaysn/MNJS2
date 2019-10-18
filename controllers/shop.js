//const products = []; //use Model instead
const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');
const CartItem = require('../models/cartItem');

//getProducts
exports.getMyCartView = (req, res, next) => {

    Product.findAll().then(products => {
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
    Product.findById(prodId, (myProduct) => {
        Cart.addProduct(prodId, myProduct.price);
    });
    console.log(prodId);
    res.redirect('/cart')
}

exports.getCheckOut = (req, res, next) => {
    res.render('admin/checkout', { docTitle: 'Checkout', path: '/checkout', activeDirection: true })
}

exports.displayProduct = (req, res, next) => {

    Product.findAll().then(products => {
        res.render('shop/productList',
            {
                prods: products,
                docTitle: 'All Products',
                path: '/productList',
                hasProducts: products.length > 0,
            });
    }).catch(err => console.log(err))
};

//getCart
exports.getCart = (req, res, next) => {

    req.user
        .getShoppingCart().then( cart =>{
      //  console.log(cart)
      let totalCost = 0.00

if (cart.totalCost) {
    totalCost = cart.totalCost
}
totalCost = totalCost.toFixed(2)

        return cart.getProducts()
        .then(products =>{
            res.render('shop/cart',
                        {
                            docTitle: 'All Products',
                            path: '/cart',
                            prods: products,
                            cost: cart.totalCost.toFixed(2)
                        }); 
        })
        .catch(err =>console.log(err));
    });
};

//getProduct
exports.getProductByID = (req, res, next) => {
    const productId = req.params.productId;


    // console.log(productId)
    Product.findByPk(productId)
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

    Product.findAll().then(products => {
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

exports.getMyOrders = (req, res, next) => {
    res.render('shop/orders', { docTitle: 'My Orders', path: '/orders', activeDirection: true })
}


exports.postcartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    const prodPrice = req.body.productIdPrice;
    // console.log(prodPrice)
    // console.log(prodId)
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart')
    })

}


