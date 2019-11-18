// require dependencies
const Product = require('../models/product');
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const ITEMS_PER_PAGE = 5;

//mongoose
exports.displayProduct = (req, res, next) => {

    const page = +req.query.page || 1;
    let totalItems = 0;

    Product.find()
    .countDocuments()
        .then(numOfProducts => {
            totalItems = numOfProducts;
            return Product.find()
                    .skip((page - 1) * ITEMS_PER_PAGE)
                    .limit(ITEMS_PER_PAGE)
        })
    .then(products => {
        res.render('shop/productList',
            {
                prods: products,
                docTitle: 'All Products',
                path: '/productList',
                hasProducts: products.length > 0
                , isLoggedIn: req.session.user ? true : false
                , totalItems: totalItems,
                hasNextPage: (ITEMS_PER_PAGE * page) < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                prevPage: page -1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                currentPage: page 
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

    const page = +req.query.page || 1;
    let totalItems = 0;

    Product
        .find()
        .countDocuments()
        .then(numOfProducts => {
            totalItems = numOfProducts;
            return Product.find()
                    .skip((page - 1) * ITEMS_PER_PAGE)
                    .limit(ITEMS_PER_PAGE)
        }).then(products => {
            res.render('shop/index',
                {
                    prods: products,
                    docTitle: 'Main Page',
                    path: '/',
                    hasProducts: products.length > 0,
                    
                    totalItems: totalItems,
                    hasNextPage: (ITEMS_PER_PAGE * page) < totalItems,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    prevPage: page -1,
                    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                    currentPage: page 
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

            let total = 0

            const products = user.cart.items.map(i => {
                let itemsCost = 0;

                //calculate totals
                itemsCost = i.quantity * i.productId.price;
                total = total + itemsCost;

                return { quantity: i.quantity, product: { ...i.productId._doc }, totalCostItems: itemsCost }
            });

            const order = new Order({
                user: {
                    name: req.user.name,
                    email: req.user.email,
                    userId: req.user
                },
                products: products,
                totalCostOrder: total
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

    Order.find({ 'user.userId': req.user._id })
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

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findById(orderId).then(order => {
        if (!order) {
            return next(new Error('No order is found'))
        }

        if (order.user.userId.toString() !== req.user._id.toString()) {
            return next(new Error('You are not authorized to see this order invoice'))
        }

        const invoiceName = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceName);


        let pdfDoc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');

        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);



        pdfDoc
            .fillColor("#241d63")
            .fontSize(20)
            .text("Company Inc.", 50, 57)
            .fontSize(10)
            .text("123 Main Street", 200, 65, { align: "right" })
            .text("Toronto, ON, L4HL4H", 200, 80, { align: "right" })
            .moveDown();

        pdfDoc.fillColor("#10240d").fontSize(16).text('Invoice Number: ' + orderId).moveDown();

        pdfDoc.fillColor("#0e140d").fontSize(14).text(`Invoice Date: ${order.date}`, 50, 215)
            .text(`Balance Due: $ ${order.totalCostOrder}`, 50, 130)
            .text(order.user.name, 350, 240)
            .text(order.user.email, 350, 265)
            .moveDown();

        generateTableRow(
            pdfDoc,
            335,
            'Item Title',
            'Unit Price',
            'Quantity',
            'SubTotal'
        );

        pdfDoc.text('____________________________________________________________________________________________', 50, 340).moveDown();


        let i,
            invoiceTableTop = 330;

        for (i = 0; i < order.products.length; i++) {
            const item = order.products[i].product;
            const position = invoiceTableTop + (i + 1) * 30;
            generateTableRow(
                pdfDoc,
                position,
                item.title,
                item.price,
                order.products[i].quantity,
                order.products[i].totalCostItems
            );
        }
        pdfDoc.fontSize(24).text('Total: $' + order.totalCostOrder, 50, invoiceTableTop + ((order.products.length + 2) * 30))

        pdfDoc
            .fontSize(10)
            .text("Payment is due within 15 days. Thank you for your business.", 50, 730,
                { align: "center", width: 500 });

        pdfDoc.end();

    }).catch(err => {
        next(err)
    });
}

function generateTableRow(doc, y, c1, c3, c4, c5) {
    doc
        .fontSize(10)
        .text(c1, 50, y)
        .text('$' + c3, 280, y, { width: 90, align: "right" })
        .text(c4, 370, y, { width: 90, align: "right" })
        .text('$' + c5, 0, y, { align: "right" });
}