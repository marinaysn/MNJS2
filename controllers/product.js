const products = [];

exports.getAddProduct =  (req, res, next) => {
    // //use this for HANDLEBARS and EJS template (comment)
    res.render('addProduct', {docTitle: 'Add Product', path: '/admin/addProduct', activeAddProduct: true, productCSS: true});
 }

 exports.postAddProduct =  (req, res, next)=>{
    products.push({title: req.body.title});
    res.redirect(301, '/');
}

exports.displayProduct = (req, res, next) => {

    // //use this for HANDLEBARS and EJS template (uncomment)
    res.render('shop', 
    {
        prods: products, 
        docTitle: 'My Shopping List', 
        path: '/shop', 
        hasProducts: products.length > 0, 
        activeShop: true, 
        productCSS: true
    });
};

