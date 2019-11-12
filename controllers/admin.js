const Product = require('../models/product');
const {validationResult} = require('express-validator');

//mongoose
exports.getAddEditProduct = (req, res, next) => {

    let msg = req.flash('error')
    if (msg.length < 1) {
        msg = null
    }

    // //use this for HANDLEBARS and EJS template (comment)
    res.render('admin/editProduct', { docTitle: 'Add Product', path: '/admin/editProduct', editing: false, isLoggedIn: req.session.user ? true : false,
    errorMessage: msg,
    prod: {title: '', description: '', price: '', imageUrl: ''},
    validationErrors: [] });
}
//mongoose
exports.postAddProduct = (req, res, next) => {

    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imgUrl = req.body.imageUrl;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors.array())
        return res.status(422).render('admin/editProduct', {
            path: '/admin/editProduct',
            editing: false,
            isLoggedIn: req.session.user ? true : false,
            docTitle: 'Add Product',
            errorMessage: errors.array()[0].msg,
            prod: {title: title, description: desc, price: price, imageUrl: imgUrl},
            validationErrors: errors.array()
        });
    }

    console.log('-------------************')

    const product = new Product({ title: title, price: price, description: desc, imageUrl: imgUrl, userId: req.session.user._id });

    product.save().then(result => {
        console.log("Row inserted")
        res.redirect('/')
    }).catch(err => console.log(err))
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
    const updatedUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const prodId = req.body.productId;
    const userId = req.user._id

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors.array())
        return res.status(422).render('admin/editProduct', {
            path: '/admin/editProduct',
            editing: true,
            isLoggedIn: req.session.user ? true : false,
            docTitle: 'Edit Product',
            errorMessage: errors.array()[0].msg,
            prod: {title: updatedTitle, description: updatedDesc, price: updatedPrice, imageUrl: updatedUrl, _id: prodId},
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
            product.imageUrl = updatedUrl;
            product.userId = userId;

            return product.save().then(result => {
                res.redirect('/admin/listOfProducts')
            })
        })
        .catch(err => console.log(err));
}
//mongoose
exports.postDeletedProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.deleteOne({ _id: prodId, userId: req.user._id })
        .then(result => {
            res.redirect('/admin/listOfProducts')
        }
        ).catch(err => console.log(err));
};

//mongoose
exports.displayAllProduct = (req, res, next) => {

    Product.find({ userId: req.user._id })
        // .select('title price -_id')
        // .populate('userId', 'name')
        .then(products => {
            res.render('admin/listOfProducts',
                {
                    prods: products,
                    docTitle: 'All Products in the Cart',
                    path: '/admin/listOfProducts'
                    , isLoggedIn: req.session.user ? true : false
                });
        })
        .catch(err => console.log(err))
};

//mongoose
exports.getAdminProducts = (req, res, next) => {
    res.render('admin/adminProducts', { docTitle: 'Admin Page', path: '/admin/adminProducts', isLoggedIn: req.session.user ? true : false })
}

//mongoose
exports.getCatalog = (req, res, next) => {
    res.render('admin/listOfProducts', { docTitle: 'List Of Products', path: '/admin/listOfProducts', isLoggedIn: req.session.user ? true : false })
}




