const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'cart.json');

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

}