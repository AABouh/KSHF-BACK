const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database");


class Transaction extends Model { }

Transaction.init({
    operation: DataTypes.INTEGER,
    label: DataTypes.TEXT

}, {
    sequelize,
    tableName: "transaction"
});

module.exports = Transaction;