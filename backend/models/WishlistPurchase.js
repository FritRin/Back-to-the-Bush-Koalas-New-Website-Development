const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const WishlistPurchase = sequelize.define(
    "WishlistPurchase",
    {
        purchase_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item_id: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        purchase_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        purchase_price: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        payment_method: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        transaction_reference: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName: "wishlist_purcahse",
        timestamps: false,
    }
);

module.exports = WishlistPurchase;