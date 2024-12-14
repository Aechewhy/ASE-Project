//

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");
const Certificate = require("./certificateModel");

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

// Định nghĩa quan hệ
CertificateFacility.hasMany(Certificate, {
  foreignKey: "certificate_facility_id",
  as: "certificates", // Alias dùng để truy vấn
});

module.exports = CertificateFacility;
