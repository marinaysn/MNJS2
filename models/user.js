const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                require: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function(product){
    const cartProductIndex = this.cart.items.findIndex(cp => {

                    return cp.productId.toString() === product._id.toString();
                });
        
                let newQty = 1;
                const updatedCartItems = [...this.cart.items];
        
                if (cartProductIndex >= 0) {
                    newQty = this.cart.items[cartProductIndex].quantity + newQty;
                    updatedCartItems[cartProductIndex].quantity = newQty
                }
                else {
                    updatedCartItems.push({ 
                        productId: product._id, 
                        quantity: newQty })
                }
        
                const updatedCart = { items: updatedCartItems }
        
                this.cart = updatedCart;
                return this.save();

}

userSchema.methods.getCart = function (){

    const productIds = this.cart.items.map(i => { return i.productId })

    return this.find({ _id: { $in: productIds } }).toArray()
        .then(products => {
            return products.map(p => {
                return {
                    ...p, quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                };
            })
        })
};

userSchema.methods.deleteItemFromCart  = function (productId) {
        const updatedCartItems = this.cart.items.filter(item => {

            return item.productId._id.toString() !== productId.toString()
        });

        this.cart.items = updatedCartItems;
        return this.save();

    };

module.exports = mongoose.model('User', userSchema);



// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class User {
//     constructor(firstName, lastName, email, cart, id) {
//         this.fname = firstName;
//         this.lname = lastName;
//         this.email = email;
//         this.cart = cart;
//         this.id = id;
//     }
//     save() {
//         // const db = getDb();
//         return getDb().collection('user').insertOne(this)
//             .then(result => { })
//             .catch(err => console.log(err));

//     };

//     addToCart(product) {
//         const cartProductIndex = this.cart.items.findIndex(cp => {

//             return cp.productId.toString() === product._id.toString();
//         });

//         let newQty = 1;
//         const updatedCartItems = [...this.cart.items];

//         if (cartProductIndex >= 0) {
//             newQty = this.cart.items[cartProductIndex].quantity + newQty;
//             updatedCartItems[cartProductIndex].quantity = newQty
//         }
//         else {
//             updatedCartItems.push({ productId: new mongodb.ObjectID(product._id), quantity: newQty })
//         }

//         const updatedCart = { items: updatedCartItems }

//         return getDb().collection('user')
//             .updateOne({ _id: new mongodb.ObjectID(this.id) },
//                 { $set: { cart: updatedCart } })
//         // .then()
//         // .catch( err => console.log(err));
//     };

//     getCart() {

//         const productIds = this.cart.items.map(i => { return i.productId })

//         return getDb().collection('product')
//             .find({ _id: { $in: productIds } }).toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p, quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     };
//                 })
//             })
//     };

//     deleteItemFromCart(prodId) {
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== prodId.toString()
//         });

//         return getDb().collection('user')
//             .updateOne({ _id: new mongodb.ObjectID(this.id) },
//                 { $set: { cart: { items: updatedCartItems } } })

//     };

//     addOrder() {
//        return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectID(this.id),
//                     fname: this.fname,
//                     lname: this.lname,
//                     email: this.email
//                 }
//             };
//            return getDb().collection('order').insertOne(order)
//         })
//         .then(result => {
//            this.cart = { items: [] };
//             return getDb().collection('user')
//             .updateOne({ _id: new mongodb.ObjectID(this.id) },
//                 { $set: { cart: { items: [] } } })
//             });
//     };

//     getOrders() {

//         console.log(this.id);
//         const db = getDb();
//         return db.collection('order')
//         .find({'user._id': new mongodb.ObjectID(this.id)}).toArray().then( orders => {

//                 return Promise.all(
//                     orders.map(order => {

//                       const orderedProductsIds = order.items.map(product => product._id );

//                       return db.collection('product')
//                                 .find({ _id: { $in: orderedProductsIds } })
//                                 .toArray()
//                                 .then(products => {
//                                   const orderedProducts = products.map(pr => {
//                                     pr.quantity = order.items.find(item => item._id.toString() === pr._id.toString()).quantity;
//                                     return pr;
//                                   });

//                                   return {
//                                     ...order,
//                                     items: [ ...orderedProducts ]
//                                   }
//                                 } )

//                     })
//                   );


//             })
//     }

//     static findUserById(userId) {

//         return getDb().collection('user')
//             .findOne({ _id: new mongodb.ObjectID(userId) })
//             .then(u => { return u })
//             .catch(err => console.log(err))
//     }

// }


// module.exports = User;