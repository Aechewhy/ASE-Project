const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class CertificateFacility extends Model {}

CertificateFacility.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
  },
  {
    sequelize,
    modelName: "certificate_facility",
    tableName: "certificate_facility",
    timestamps: false,
    logging: false,
  },
);

module.exports = CertificateFacility;
