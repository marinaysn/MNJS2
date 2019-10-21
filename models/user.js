const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(firstName, lastName, email, cart, id){
       this.fname = firstName;
       this.lname = lastName;
       this.email = email;
       this.cart = cart;
       this.id = id;
    }
    save(){
       // const db = getDb();
        return getDb().collection('user').insertOne(this)
        .then( result =>{})
        .catch(err => console.log(err));

    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp =>{
            
            return cp.productId.toString() === product._id.toString();
        });
    
        let newQty = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0){
            newQty = this.cart.items[cartProductIndex].quantity + newQty;
            updatedCartItems[cartProductIndex].quantity = newQty
        }
        else {
            updatedCartItems.push({productId: new mongodb.ObjectID(product._id), quantity: newQty})
        }
       
        const updatedCart = { items: updatedCartItems}

        return getDb().collection('user')
        .updateOne({ _id : new mongodb.ObjectID(this.id)}, 
            {$set: {cart: updatedCart}})
            // .then()
            // .catch( err => console.log(err));
    }

    getCart(){

        const productIds = this.cart.items.map(i => 
            {return i.productId})

        return getDb().collection('product')
        .find({_id: { $in: productIds}}).toArray()
        .then( products =>
            {
            return products.map( p=>{
                return {...p, quantity: this.cart.items.find(i=>{
                    return i.productId.toString() === p._id.toString();
                    }).quantity};
                })
            })
    };

    deleteItemFromCart(prodId){
        const updatedCartItems = this.cart.items.filter(item =>{
            return  item.productId.toString() !== prodId.toString()
        });

        return getDb().collection('user')
        .updateOne({ _id : new mongodb.ObjectID(this.id)}, 
            {$set: {cart: {items: updatedCartItems}}})

    };

    static findUserById(userId){

        return getDb().collection('user')
        .findOne({ _id: new mongodb.ObjectID(userId)})
        .then(u =>{return u})
        .catch(err=>console.log(err))
    }

}


module.exports = User;