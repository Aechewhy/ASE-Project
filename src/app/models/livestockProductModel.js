const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class LivestockProduct extends Model {}

LivestockProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(100) },
    

    raising_facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "raising_facility", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "raising_employee",
    tableName: "raising_employee",
    timestamps: false,
    logging: false,
  },
);

module.exports = LivestockProduct;
