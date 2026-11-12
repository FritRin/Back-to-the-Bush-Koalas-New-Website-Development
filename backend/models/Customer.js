const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Customer = sequelize.define(
    "Customer",
    {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        street_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        street_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        suburb: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        postcode: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        company_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "customer",
        timestamps: false,
    }
);

module.exports = Customer;