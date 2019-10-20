const Product = require('../models/product');
const mongodb = require('mongodb');

//mongo
exports.getAddEditProduct = (req, res, next) => {
    // //use this for HANDLEBARS and EJS template (comment)
    res.render('admin/editProduct', { docTitle: 'Add Product', path: '/admin/editProduct', editing: false});
}
//mongo
exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title});

    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imgUrl = req.body.imageUrl;

   const product = new Product(title, price, desc, imgUrl);
    
    product.save().then(result => {
        console.log("Row inserted")
        res.redirect('/')
    }).catch(err=> console.log(err)) 
}

//mongo - mar
exports.getEditProduct = (req, res, next) => {
    
    const editMode = req.query.edit;

    console.log(editMode);

    if (editMode !== "true") {
      return res.redirect('/');
    }
  
    const prodId = req.params.productId;
    
    Product.findById(prodId)
    .then(product =>{    
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
//mongo - mar
exports.postEditProduct  = (req, res, next) =>{

   const updatedTitle = req.body.title;
   const updatedUrl = req.body.imageUrl;
   const updatedPrice = req.body.price;
   const updatedDesc = req.body.description;
   const prodId =  req.body.productId;

    Product.findById(prodId)
    .then( product =>{

        return Product.updateOne(prodId, updatedTitle, updatedPrice, updatedDesc, updatedUrl);
    }).then( result =>{
        res.redirect('/admin/listOfProducts')}
   ).catch(err => console.log(err));
}
//todo
exports.postDeletedProduct = (req, res, next) => {
    const prodId =  req.body.productId;
    
    Product.findById(prodId)
    .then( product =>{

        Product.deleteByID(prodId);
    }).then( result =>{
        res.redirect('/admin/listOfProducts')}
   ).catch(err => console.log(err));


//   return Product.destroy({
//         where: {
//             id: prodId
//         }
//     }).then( result =>{
//         res.redirect('/admin/listOfProducts')
//     }).catch(err => console.log(err))
};

//mongo - mar
exports.displayAllProduct = (req, res, next) => {

    Product.fetchAll() 
    .then(products => {
        res.render('admin/listOfProducts',
            {
                prods: products,
                docTitle: 'All Products in the Cart',
                path: '/admin/listOfProducts'
            });
})
.catch(err => console.log(err))
};

//mongo
exports.getAdminProducts = (req, res, next) =>{
    res.render('admin/adminProducts', { docTitle: 'Admin Page', path: '/admin/adminProducts', activeDirection: true })
}

//mongo
exports.getCatalog = (req, res, next) =>{
    res.render('admin/listOfProducts', { docTitle: 'List Of Products', path: '/admin/listOfProducts', activeDirection: true })
}




