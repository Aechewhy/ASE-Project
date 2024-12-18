const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class WasteTreatmentProduct extends Model {}

WasteTreatmentProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(100) },
    price: { type: DataTypes.DECIMAL(10, 2) },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "waste_treatment_facility", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "waste_treatment_product",
    tableName: "waste_treatment_product",
    timestamps: false,
    logging: false,
  },
);

module.exports = WasteTreatmentProduct;
