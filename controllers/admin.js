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

exports.postEditProduct  = (req, res, next) =>{

   const updatedTitle = req.body.title;
   const updatedUrl = req.body.imageUrl;
   const updatedPrice = req.body.price;
   const updatedDesc = req.body.description;
   const prodId =  req.body.productId;

//    console.log(updatedTitle)
   const updatedProd = new Product(updatedTitle, updatedUrl, updatedDesc, updatedPrice, prodId);

   updatedProd.save();
   res.redirect('/admin/listOfProducts')
}

exports.postDeletedProduct = (req, res, next) => {
    const prodId =  req.body.productId;
    Product.deleteByID(prodId);
    res.redirect('/admin/listOfProducts')
};


exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title});

    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imgUrl = req.body.imageUrl;

    const product = new Product(title, imgUrl, desc, price, null);
    product.save();
    res.redirect(301, '/');
}

exports.displayAllProduct = (req, res, next) => {

    Product.fetchAll()
    .then(([rows, fieldData]) =>{
        res.render('admin/listOfProducts',
            {
                prods: rows,
                docTitle: 'All Products in the Cart',
                path: '/admin/listOfProducts'
            });

    })
    .catch( err => console.log(err))


        
    
};


exports.getAdminProducts = (req, res, next) =>{
    res.render('admin/adminProducts', { docTitle: 'Admin Page', path: '/admin/adminProducts', activeDirection: true })
}


exports.getCatalog = (req, res, next) =>{
    res.render('admin/listOfProducts', { docTitle: 'List Of Products', path: '/admin/listOfProducts', activeDirection: true })
}




