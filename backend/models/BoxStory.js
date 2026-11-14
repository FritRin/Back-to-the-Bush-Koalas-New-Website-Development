const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const KoalaStory = require("./KoalaStory");

const BoxStory = sequelize.define(
    "BoxStory",
    {
        box_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        story_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        slot: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: "box_story",
        timestamps: false,
    }
);

BoxStory.belongsTo(KoalaStory, { foreignKey: "story_id", as: "story" });

module.exports = BoxStory;