const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Koala = sequelize.define(
    "Koala",
    {
        koala_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

    admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "admins",
                key: "admin_id",
            }
        },
    
    koala_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        },
    
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        },   
    
    image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
        },
    
    status: {
        type: DataTypes.STRING(100),
        allowNull: false,
        },

    date_added: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "koala",
        timestamps: false,
    }
);

module.exports = Koala;