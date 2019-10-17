const db = require('../util/database');


const Cart = require('../models/cart');



module.exports = class Product {
    constructor(t, img, d, p, id) {

        this.title = t;
        this.imageUrl = img;
        this.price = p;
        this.description = d;
        this.id = id;
    }

    save() {


    };

    static deleteByID(prodId) {


    }

    static fetchAll() {
       return db.execute('Select * from product');
    };

    static findById(id, callback) {


    }
};