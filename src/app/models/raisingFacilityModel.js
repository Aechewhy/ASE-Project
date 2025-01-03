const { DataTypes, Model, STRING } = require("sequelize");
const { sequelize } = require("../../config/database");

class RaisingFacility extends Model {}

RaisingFacility.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    livestock_type: { type: DataTypes.STRING(100) },
    owner: { type: DataTypes.STRING(100) },
    location: { type: DataTypes.STRING(100) },
    size: { type: DataTypes.STRING(100) },
    employee_number: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: "raising_facility",
    tableName: "raising_facility",
    timestamps: false,
    logging: false,
  },
);

module.exports = RaisingFacility;
