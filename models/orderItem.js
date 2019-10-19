const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    totalCost: {
       type: Sequelize.INTEGER,
       defaultValue: 0
    }
});

module.exports = OrderItem;