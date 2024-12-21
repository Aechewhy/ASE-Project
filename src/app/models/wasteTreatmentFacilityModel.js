const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class WasteTreatmentFacility extends Model {}

WasteTreatmentFacility.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    location: { type: DataTypes.STRING(100) },
  },
  {
    sequelize,
    modelName: "waste_treatment_facility",
    tableName: "waste_treatment_facility",
    timestamps: false,
    logging: false,
  },
);

module.exports = WasteTreatmentFacility;
