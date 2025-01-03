const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class TestingFacility extends Model {}

TestingFacility.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(255) },
    location: { type: DataTypes.STRING(255) },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "waste_treatment_facility", key: "id" },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "waste_treatment_product", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "testing_facility",
    tableName: "testing_facility",
    timestamps: false,
    logging: false,
  },
);

module.exports = TestingFacility;
