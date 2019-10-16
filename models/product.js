const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const Cart = require('../models/cart');

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
                if (this.id) {
                    const existingProdIdx = products.findIndex(prod => prod.id === this.id);

                    const updatedProd = [...products];
                    updatedProd[existingProdIdx] = this;
                    fs.writeFile(p, JSON.stringify(updatedProd), (err) => {
                        console.log(err)
                    });
                }
                else {
                    let arrLen = products.length
                    
                    this.id = Number(products[arrLen-1].id) + 1 + "";
                    
                    console.log(this.id )

                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        console.log(err)
                    });
                }

            });
        });
    };

    static deleteByID(prodId) {

        //this.id = (Math.floor(Math.random() * 100)).toString;
        const p = path.join(rootDir, 'data', 'products.json');
        // let products = [];
        fs.readFile(p, (err, fileContend) => {
            getProductsFromFile(products => {

                const product = products.find(prod => prod.id === prodId);

                const updatedProducts = products.filter(prod => prod.id !== prodId);

                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    if (!err) {
                        Cart.deleteProduct(prodId, product.price);
                    }
                });
            });
        });
    }

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