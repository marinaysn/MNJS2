//const products = []; //use Model instead
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getMyCartView = (req, res, next) => {

    const products = Product.fetchAll()
    .then(([rows, fieldData]) =>{
        res.render('shop/cart',
            {
                prods: rows,
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

const products = Product.fetchAll()
        .then(([rows, fieldData]) =>{
            res.render('shop/productList',
            {
                prods: rows,
                docTitle: 'All Products',
                path: '/productList',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
        })
        .catch(err => console.log(err));
};

exports.displayAllProductInCart = (req, res, next) => {

    Cart.fetchAll((cart) => {
        
        Product.fetchAll(products => {
            const cartProducts =[];

            for (product of products){

               const cartProdData = cart.products.find(prod => prod.id === product.id);
                if( cartProdData ){
                    cartProducts.push({productData: product, qty: cartProdData.qty});  
                }
            }
            // //use this for HANDLEBARS and EJS template (uncomment)
            res.render('shop/cart',
                {
                    docTitle: 'All Products',
                    path: '/cart',
                    prods: cartProducts,
                    cost: cart.totalCost.toFixed(2)
                });

        });
    });
};

    exports.getProductByID = (req, res, next) => {
        const productId = req.params.productId;
        // console.log(productId)
        Product.findById(productId)
        .then(([product, fieldData]) =>{
           
            res.render('shop/productDetails', 
            { 
            docTitle: product[0].title, 
            path: '/productDetails', 
            prod: product[0], 
            activeDirection: true })
        }
        )
        .catch(err => console.log(err));
      
    }

    exports.getIndex = (req, res, next) => {
        const products = Product.fetchAll()
        .then(([rows, fieldData]) =>{
             res.render('shop/index',
                {
                    prods: rows,
                    docTitle: 'Main Page',
                    path: '/',
                    hasProducts: rows.length > 0,
                    activeShop: true,
                    productCSS: true
                });
        })
        .catch(err => console.log(err));
    }

    exports.getMyOrders = (req, res, next) => {
        res.render('shop/orders', { docTitle: 'My Orders', path: '/orders', activeDirection: true })
    }


exports.postcartDeleteItem =(req, res, next)=>{
    const prodId =  req.body.productId;
    const prodPrice = req.body.productIdPrice;
    // console.log(prodPrice)
    // console.log(prodId)
    Product.findById(prodId, product =>{
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart')
    })
    
}


