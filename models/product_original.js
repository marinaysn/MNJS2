const db = require('../util/database');


const Cart = require('./cart');



module.exports = class Product {
    constructor(t, img, d, p, id) {

        this.title = t;
        this.imageUrl = img;
        this.price = p;
        this.description = d;
        this.id = id;
    }

    save() {
      return db.execute('INSERT INTO product (title, description, price, imageUrl ) VALUES (?,?,?,?)', [this.title,this.description, this.price, this.imageUrl])

    };

    static deleteByID(prodId) {


    }

    static fetchAll() {
       return db.execute('Select * from product');
    };

    static findById(id) {

      return  db.execute('SELECT * from product WHERE id = ?', [id])

    }
};