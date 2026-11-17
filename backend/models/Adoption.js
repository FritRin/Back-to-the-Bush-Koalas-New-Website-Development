const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Adoption = sequelize.define(
    "Adoption",
    {
        adoption_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        koala_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        transaction_reference: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        adoption_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "adoption",
        timestamps: false,
    }
);

module.exports = Adoption;