const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class DisposalFacility extends Model {}

DisposalFacility.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(100) },
    location: { type: DataTypes.STRING(100) },
    contact_number: { type: DataTypes.STRING(100) },
    capacity: { type: DataTypes.INTEGER(100) },
    vet_facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "vet_facility", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "disposal_facility",
    tableName: "disposal_facility",
    timestamps: false,
    logging: false,
  },
);

module.exports = DisposalFacility;
