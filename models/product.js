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
    constructor(t, img, d, p) {

        this.title = t;
        this.imageUrl = img;
        this.price = p;
        this.description = d;

    }

    save() {
        //this.id = (Math.floor(Math.random() * 100)).toString;
        const p = path.join(rootDir, 'data', 'products.json');
        let products = [];
        fs.readFile(p, (err, fileContend) => {

            getProductsFromFile(products => {
                this.id = products.length + 1
                products.push(this);

                fs.writeFile(p, JSON.stringify(products), (err) => {
                });
            });


        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

}