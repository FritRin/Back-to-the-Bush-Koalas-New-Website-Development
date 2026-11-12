const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Donation = sequelize.define(
    "Donation",
    {
        donation_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        donation_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        transaction_reference: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName: "donation",
        timestamps: false,
    }
);

module.exports = Donation;