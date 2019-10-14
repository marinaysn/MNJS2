const Product = require('../models/product');

exports.getAddEditProduct = (req, res, next) => {
    // //use this for HANDLEBARS and EJS template (comment)
    res.render('admin/editProduct', { docTitle: 'Add Product', path: '/admin/editProduct', editing: false});
}

exports.getEditProduct = (req, res, next) => {
    
    const editMode = req.query.edit;
    if (editMode !== "true") {
      return res.redirect('/');
    }
  
    const prodId = req.params.productId;
    Product.findById(prodId, product =>{

        if (!product) {
            return res.redirect('/')
        }
    res.render('admin/editProduct', { 
        docTitle: 'Edit Product', 
        path: 'admin/editProduct', 
        editing: editMode, 
        prod: product });
   });
}

exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title});

    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imgUrl = req.body.imageUrl;

    const product = new Product(title, imgUrl, desc, price);
    product.save();
    res.redirect(301, '/');
}

exports.displayAllProduct = (req, res, next) => {

    Product.fetchAll((products) => {
        res.render('admin/listOfProducts',
            {
                prods: products,
                docTitle: 'Catalog of All Products',
                path: '/admin/listOfProducts'
            });
    });
};


exports.getAdminProducts = (req, res, next) =>{
    res.render('admin/adminProducts', { docTitle: 'Admin Page', path: '/admin/adminProducts', activeDirection: true })
}

//same as displayAllProduct for now
exports.getCatalog = (req, res, next) =>{
    res.render('admin/listOfProducts', { docTitle: 'List Of Products', path: '/admin/listOfProducts', activeDirection: true })
}




