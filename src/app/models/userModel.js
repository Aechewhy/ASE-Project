const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    email: { type: DataTypes.STRING(100) },
    phone_number: { type: DataTypes.STRING(100) },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: { type: DataTypes.STRING(255) },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "user",
    timestamps: false,
  },
);

module.exports = User;
