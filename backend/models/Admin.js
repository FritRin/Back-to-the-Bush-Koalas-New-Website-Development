const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Admin = sequelize.define(
    "Admin",
    {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        failed_login_attempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        locked_until: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "admins",
        timestamps: false,
    }
);

module.exports = Admin;