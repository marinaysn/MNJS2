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
    
    //other method - method 2
    // Product.findByPk(prodId)
    // .then(product =>{
    req.user.getProducts({where: {id: prodId}})
    .then(products =>{
            const product = products[0];
    // end other method - method 2
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

   //method 1
  return Product.update({
    title: updatedTitle,
    imageUrl: updatedUrl,
    price: updatedPrice,
    description: updatedDesc
   },
   {
       where : {
           id: prodId
       }
   }).then( result =>{
        res.redirect('/admin/listOfProducts')}
   ).catch(err => console.log(err));

//     //method 2

//     Product.findByPk(prodId)
//     .then( product =>{
//         product.title = updatedTitle;
//         product.imageUrl = updatedUrl;
//         product.price = updatedPrice;
//         product.description = updatedDesc;

//         return product.save();
//     }).then( result =>{
//         res.redirect('/admin/listOfProducts')}
//    ).catch(err => console.log(err));
}

exports.postDeletedProduct = (req, res, next) => {
    const prodId =  req.body.productId;
    // Product.deleteByID(prodId);
    // res.redirect('/admin/listOfProducts')


  return Product.destroy({
        where: {
            id: prodId
        }
    }).then( result =>{
        res.redirect('/admin/listOfProducts')
    }).catch(err => console.log(err))
};


exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title});

    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imgUrl = req.body.imageUrl;

    req.user.createProduct({
        title: title,
        imageUrl: imgUrl,
        description: desc,
        price: price
    }).then(result => {
        console.log("Row inserted")
        res.redirect('/')
    }).catch(err=> console.log(err))
  
}

exports.displayAllProduct = (req, res, next) => {

   // Product.findAll()
    req.user.getProducts()
    
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


exports.getAdminProducts = (req, res, next) =>{
    res.render('admin/adminProducts', { docTitle: 'Admin Page', path: '/admin/adminProducts', activeDirection: true })
}


exports.getCatalog = (req, res, next) =>{
    res.render('admin/listOfProducts', { docTitle: 'List Of Products', path: '/admin/listOfProducts', activeDirection: true })
}




