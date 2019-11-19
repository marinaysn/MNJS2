const Product = require('../models/product');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fileHelper = require('../util/file');

const ITEMS_PER_PAGE = 5;
//mongoose
exports.getAddEditProduct = (req, res, next) => {

    let msg = req.flash('error')
    if (msg.length < 1) {
        msg = null
    }

    // //use this for HANDLEBARS and EJS template (comment)
    res.render('admin/editProduct', {
        docTitle: 'Add Product', path: '/admin/editProduct', editing: false, isLoggedIn: req.session.user ? true : false,
        errorMessage: msg,
        prod: { title: '', description: '', price: '' },
        validationErrors: []
    });
}
//mongoose
exports.postAddProduct = (req, res, next) => {

    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const image = req.file;
    const imageUrl = req.file.path;

    if (!image) {
        return res.status(422).render('admin/editProduct', {
            path: '/admin/editProduct',
            editing: false,
            isLoggedIn: req.session.user ? true : false,
            docTitle: 'Add Product',
            errorMessage: 'Attachced file is not an image',
            prod: { title: title, description: desc, price: price },
            validationErrors: []
        });
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // console.log(errors.array())
        return res.status(422).render('admin/editProduct', {
            path: '/admin/editProduct',
            editing: false,
            isLoggedIn: req.session.user ? true : false,
            docTitle: 'Add Product',
            errorMessage: errors.array()[0].msg,
            prod: { title: title, description: desc, price: price },
            validationErrors: errors.array()
        });
    }



    const product = new Product({
        //to test error handling
        // _id: new mongoose.Types.ObjectId('5dbe4faed0ce5b3880a4eb46'),
        title: title,
        price: price,
        description: desc,
        imageUrl: imageUrl,
        userId: req.session.user._id
    });

    product.save().then(result => {
        console.log("Row inserted")
        res.redirect('/')
    })
        .catch(err => {

            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
            error.httpStatusCode = 500;
            return next(error);

        });
}
//mongoose
exports.getEditProduct = (req, res, next) => {

    let msg = req.flash('error')
    if (msg.length < 1) {
        msg = null
    }

    const editMode = req.query.edit;

    if (editMode !== "true") {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/editProduct', {
                docTitle: 'Edit Product',
                path: 'admin/editProduct',
                editing: editMode,
                prod: product,
                errorMessage: msg
                , isLoggedIn: req.session.user ? true : false,
                validationErrors: []
            });
        });
}
//mongoose
exports.postEditProduct = (req, res, next) => {

    const updatedTitle = req.body.title;
    const image = req.file;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const prodId = req.body.productId;
    const userId = req.user._id

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(422).render('admin/editProduct', {
            path: '/admin/editProduct',
            editing: true,
            isLoggedIn: req.session.user ? true : false,
            docTitle: 'Edit Product',
            errorMessage: errors.array()[0].msg,
            prod: { title: updatedTitle, description: updatedDesc, price: updatedPrice, _id: prodId },
            validationErrors: errors.array()
        });
    }

    Product.findById(prodId)
        .then(product => {

            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/')
            }
            product.description = updatedDesc;
            product.price = updatedPrice;
            product.title = updatedTitle;

            if (image) {
                fileHelper.deleteFile(product.imageUrl);
                product.imageUrl = image.path;
            }
            product.userId = userId;

            return product.save().then(result => {
                res.redirect('/admin/listOfProducts')
            })
        })
        .catch(err => {
            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
            error.httpStatusCode = 500;
            return next(error);
        });
}
//mongoose
exports.postDeletedProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(p => {

        if (!p) {
            return next(new Error('Product not Found'))
        }
        fileHelper.deleteFile(p.imageUrl);
        return Product.deleteOne({ _id: prodId, userId: req.user._id })
    }
    ).then(result => {
        res.redirect('/admin/listOfProducts')
    }
    ).catch(err => {
        let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
        const error = new Error(str)
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;


    Product.findById(prodId).then( p =>{

        if (!p){
            return next(new Error('Product not Found'))
        }
        fileHelper.deleteFile(p.imageUrl);
        return Product.deleteOne({ _id: prodId, userId: req.user._id })
    }   
    ).then(result => {
       // res.redirect('/admin/listOfProducts')
       res.status(200).json({ message: 'Product successfuly deleted'});
    }
      ).catch(err => {
            res.status(500).json({ message: 'Failed to delete the product'});
        });
};

//mongoose
exports.displayAllProduct = (req, res, next) => {

    const page = +req.query.page || 1;
    let totalItems = 0;

    Product.find({ userId: req.user._id })
        .countDocuments()
        .then(numOfProducts => {
            totalItems = numOfProducts;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {
            res.render('admin/listOfProducts',
                {
                    prods: products,
                    docTitle: 'All Products in the Cart',
                    path: '/admin/listOfProducts'
                    , isLoggedIn: req.session.user ? true : false
                    , totalItems: totalItems,
                    hasNextPage: (ITEMS_PER_PAGE * page) < totalItems,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    prevPage: page - 1,
                    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                    currentPage: page
                });
        })
        .catch(err => {
            let str = err.errmsg.substring(err.errmsg.indexOf(' '), err.errmsg.indexOf(':'))
            const error = new Error(str)
            error.httpStatusCode = 500;
            return next(error);
        });
};
//mongoose
exports.getAdminProducts = (req, res, next) => {
    res.render('admin/adminProducts', { docTitle: 'Admin Page', path: '/admin/adminProducts', isLoggedIn: req.session.user ? true : false })
}
//mongoose
exports.getCatalog = (req, res, next) => {
    res.render('admin/listOfProducts', { docTitle: 'List Of Products', path: '/admin/listOfProducts', isLoggedIn: req.session.user ? true : false })
}

