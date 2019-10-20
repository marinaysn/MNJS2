const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl, id){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;

        if (id){
            this._id = new mongodb.ObjectID(id) 
        }  
    }


    save() {
        const db = getDb();
        let dbOp;

        if (this._id){
            dbOp = db.collection('product')
            .updateOne({
                 _id : this._id },
                { $set:  this})
        }
        else {
            dbOp = db.collection('product').insertOne(this)
            console.log('Row is here inserted')
        }
        return dbOp.then(result=>{
                })
                .catch(err => console.log(err));
    }

    static updateOneItem(prodId, t, p, d, i) {
        const db = getDb();

         return db.collection('product')
            .updateOne({
                 _id : new mongodb.ObjectID(prodId) },
                { $set: { title : t, price: p, description: d, imageUrl: i } 

            })
                .then(result=>{
                })
                .catch(err => console.log(err));
    }

    static deleteByID(prodId) {
        const db = getDb();

         return db.collection('product')
            .deleteOne({
                 _id : new mongodb.ObjectID(prodId) 
            })
                .then(result=>{
                   
                })
                .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('product')
            .find().toArray()
                .then(products =>{
                    return products;
                })
                .catch();
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('product')
            .find( { _id: new mongodb.ObjectID(prodId) }).next()
                .then(p =>{
                    return p;
                })
                .catch();
    }

}

module.exports = Product;