const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class vetFacility extends Model {}

vetFacility.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    location: { type: DataTypes.STRING(100) },
    contact_number: { type: DataTypes.STRING(100) },
    capacity: { type: DataTypes.INTEGER(100) },
  },
  {
    sequelize,
    modelName: "vet_facility",
    tableName: "vet_facility",
    timestamps: false,
    logging: false,
  },
);

module.exports = vetFacility;
