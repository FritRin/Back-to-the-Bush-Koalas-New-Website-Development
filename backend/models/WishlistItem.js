const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const WishlistItem = sequelize.define(
    "WishlistItem",
    {
        item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        item_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        item_description: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        item_image_url: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        number_of_items: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
        },
    },
    {
        tableName: "wishlist_item",
        timestamps: false,
    }
);

module.exports = WishlistItem;