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
    let innerCart;
    let newQty = 1;

    req.user
        .getShoppingCart().then(cart => {
            innerCart = cart;
            return cart.getProducts({ where: { id: prodId } })
        }).then(products => {

            let product;
            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                //... add product to the card if it exists
                const oldQty = product.cartItem.quantity;
                newQty = newQty + oldQty;
                // return product;
            }
            return Product.findByPk(prodId)
                .then(product => {

                    let newTotal = innerCart.totalCost + product.price;

                    Cart.update({
                        totalCost: newTotal
                    },
                        {
                            where: {
                                id: innerCart.id
                            }
                        })

                    return innerCart.addProduct(product, { through: { quantity: newQty } });
                })
                .catch(err => console.log(err));
        }).then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
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
        .getShoppingCart().then(cart => {
            let totalCost = 0.00

            if (cart.totalCost) {
                totalCost = cart.totalCost
            }
            totalCost = totalCost.toFixed(2)

            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart',
                        {
                            docTitle: 'All Products',
                            path: '/cart',
                            prods: products,
                            cost: cart.totalCost.toFixed(2)
                        });
                })
                .catch(err => console.log(err));
        });
};

//getProduct
exports.getProductByID = (req, res, next) => {
    const productId = req.params.productId;

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
     const qty = req.body.productQty;
    let cartId = 0;
    req.user.getShoppingCart()
    .then( cart =>{
 
         totalCost = cart.totalCost;
         cartId = cart.id;
        return cart.getProducts({where: { id: prodId}})
    })
    .then(products =>{
        const product = products[0];
        console.log('totalCost ' + totalCost)
        console.log('qty ' + qty)
        console.log('product.price ' + product.price)
        
        const total = totalCost - (qty * product.price);
          
        Cart.update({
            totalCost: total,
        },{
                where: {
                    id: cartId
                }
        })
        
        return product.cartItem.destroy();
        
    })
    .then(result =>{
        res.redirect('/cart')
    })
    .catch(err => console.log(err));

}


