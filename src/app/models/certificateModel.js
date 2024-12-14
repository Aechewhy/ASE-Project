const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class Certificate extends Model {}

Certificate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(100) },
    certificate_facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "certificate_facility", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "certificate",
    tableName: "certificate",
    timestamps: false,
    logging: false,
  },
);

module.exports = Certificate;
