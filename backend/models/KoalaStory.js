const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const KoalaStory = sequelize.define(
    "KoalaStory",
    {
        story_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        koala_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_urls: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "koala_story",
        timestamps: false,
    }
);

module.exports = KoalaStory;