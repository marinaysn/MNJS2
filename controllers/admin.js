const Product = require('../models/product');

//mongoose
exports.getAddEditProduct = (req, res, next) => {

    // if (!req.session.isLoggedIn){
    //    return res.redirect('/login');
    // }

    // //use this for HANDLEBARS and EJS template (comment)
    res.render('admin/editProduct', { docTitle: 'Add Product', path: '/admin/editProduct', editing: false, isLoggedIn: req.session.user ? true : false});
}
//mongoose
exports.postAddProduct = (req, res, next) => {

    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imgUrl = req.body.imageUrl;

    const product = new Product({title: title, price: price, description: desc, imageUrl: imgUrl, userId: req.session.user._id });

    product.save().then(result => {
        console.log("Row inserted")
        res.redirect('/')
    }).catch(err => console.log(err))
}

//mongoose
exports.getEditProduct = (req, res, next) => {

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
                prod: product
                , isLoggedIn: req.session.user ? true : false
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

    Product.findById(prodId)
    .then(product => {

        product.description = updatedDesc;
        product.price = updatedPrice;
        product.title = updatedTitle;
        product.imageUrl = updatedUrl;
        product.userId  = userId;
        
        return product.save()
    }).then(result => {
            res.redirect('/admin/listOfProducts')
        })
        .catch(err => console.log(err));

}
//mongoose
exports.postDeletedProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.deleteOne({_id: prodId})
        .then(result => {
            res.redirect('/admin/listOfProducts')
        }
        ).catch(err => console.log(err));
};

//mongoose
exports.displayAllProduct = (req, res, next) => {

    Product.find()
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




