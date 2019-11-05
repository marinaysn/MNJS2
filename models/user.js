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
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
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
    },
    orderItems: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
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

    return this.cart.find().where('_id').in(productIds).exec((err, products) => {
        return products.map(p => {
            return {
                ...p, quantity: this.cart.items.find(i => {
                    return i.productId.toString() === p._id.toString();
                }).quantity
            };
        })

    });

   
};

userSchema.methods.deleteItemFromCart  = function (productId) {
        const updatedCartItems = this.cart.items.filter(item => {

            return item.productId._id.toString() !== productId.toString()
        });

        this.cart.items = updatedCartItems;
        return this.save();

    };

userSchema.methods.clearCart = function() {

    this.cart = {items: []}
    return this.save();
}

module.exports = mongoose.model('User', userSchema);