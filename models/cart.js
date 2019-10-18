const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('shoppingCart',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    totalCost: {
       type: Sequelize.DOUBLE,
       defaultValue: 0.00
    }
});

module.exports = Cart;