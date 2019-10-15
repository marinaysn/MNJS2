const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const getProductsFromFile = (callback) => {
    const p = path.join(rootDir, 'data', 'products.json');

    fs.readFile(p, (err, fileContend) => {

        if (err) {

            return callback([]);
        }
        else {
            callback(JSON.parse(fileContend));
        }
    })
}

module.exports = class Product {
    constructor(t, img, d, p, id) {
        
        this.title = t;
        this.imageUrl = img;
        this.price = p;
        this.description = d;
        this.id = id;
    }

    save() {
        
        //this.id = (Math.floor(Math.random() * 100)).toString;
        const p = path.join(rootDir, 'data', 'products.json');
       // let products = [];
        fs.readFile(p, (err, fileContend) => {

            getProductsFromFile(products => {
                if (this.id){
                    const existingProdIdx = products.findIndex( prod => prod.id === this.id);

                   const updatedProd = [...products];
                   updatedProd[existingProdIdx] = this;
                   fs.writeFile(p, JSON.stringify(updatedProd), (err) => {
                       console.log(err)
                });
                }
                else {
                    this.id = products.length + 1 + "";
                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        console.log(err)
                });
                }
                
            });
        });
    };

    static fetchAll(callback) {
        getProductsFromFile(callback);
    };

    static findById(id, callback) {

        getProductsFromFile(products => {
            const productDetails = products.find(p => {
                return p.id === id;
            })
            callback(productDetails);
        });

    }

};