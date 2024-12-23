const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class Slaughterhouse extends Model {}

Slaughterhouse.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(100) },
        location: { type: DataTypes.STRING(255) },
        contact_number: { type: DataTypes.STRING(20) },
        capacity: { type: DataTypes.INTEGER },
    },
    {
        sequelize,
        modelName: "slaughterhouse",
        tableName: "slaughterhouse",
        timestamps: false,
        logging: false,
    }
);

module.exports = Slaughterhouse;
