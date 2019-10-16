const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'cart.json');

const getProductsFromFile = (callback) => {

    fs.readFile(p, (err, fileContend) => {

        if (err) {

            return callback([]);
        }
        else {
            callback(JSON.parse(fileContend));
        }
    })
}

module.exports = class Cart {
    
    static addProduct(id, price){
        //fetch the previous cart
        fs.readFile(p, (err, fileContent)=>{
            
            let cart = {products: [], totalCost: 0};

            if (!err){
               cart = JSON.parse(fileContent); 
            }
        
        //Analyze cart => Find existing products
        const existingProductIndex = cart.products.findIndex( prod => prod.id === id);
        const existingProduct = cart.products[existingProductIndex];

        let updatedProduct;
        
        //Add new product or increase quantity and total cost
        if(existingProduct){
           updatedProduct = {...existingProduct};
           updatedProduct.qty = updatedProduct.qty +1;
           cart.products = [...cart.products];
           cart.products[existingProductIndex] = updatedProduct;
        }
        else {
            updatedProduct = {id: id, qty: 1};
            cart.products = [...cart.products, updatedProduct];
        }
        cart.totalCost = cart.totalCost + + price;
        fs.writeFile(p, JSON.stringify(cart), (err) =>{
            console.log(err)
        })
    })
}

    static deleteProduct(id, price){
        fs.readFile(p, (err, fileContent)=>{
         
        if (err){
            return;
        }

        let updatedCart = {...JSON.parse(fileContent)};
        const product = updatedCart.products.find(prod => prod.id === id);

        if (product) {
        const prodQty = product.qty;
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
        console.log(updatedCart.totalCost)
        console.log(price)
        console.log(prodQty)
        updatedCart.totalCost = updatedCart.totalCost - price * prodQty;
        fs.writeFile(p, JSON.stringify(updatedCart), (err) =>{
            console.log(err)
        })
        }
        else return;
    });
}

static fetchAll(callback) {
    getProductsFromFile(callback);
};

}