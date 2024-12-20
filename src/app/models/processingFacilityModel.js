const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class ProcessingFacility extends Model {}

ProcessingFacility.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(100) },
    owner: { type: DataTypes.STRING(100) },
    location: { type: DataTypes.STRING(100) },
    type: { type: DataTypes.STRING(100) },

    raising_facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "raising_facility", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "processing_facility",
    tableName: "processing_facility",
    timestamps: false,
    logging: false,
  },
);

module.exports = ProcessingFacility;
