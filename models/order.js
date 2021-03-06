const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const orderSchema = new Schema({

    user: {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            require: true
        }
    },
    products: [{

        product: {
            type: Object,
            require: true
        },

        quantity: {
            type: Number,
            require: true
        },

        totalCostItems: {
            type: Number,
           // require: true,
            default: 0
        }

    }],
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
      totalCostOrder: {
        type: Number,
       // require: true,
        default: 0
    }

});

module.exports = mongoose.model('Order', orderSchema);
