const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class RaisingCertificate extends Model {}

RaisingCertificate.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    raising_facility_id: { type: DataTypes.INTEGER },
    certificate_id: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: "raising_certificate",
    tableName: "raising_certificate",
    timestamps: false,
    logging: false,
  },
);

module.exports = RaisingCertificate;
