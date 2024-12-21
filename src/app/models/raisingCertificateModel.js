const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

const RaisingCertificate = sequelize.define(
  'RaisingCertificate',
  {
    raising_facility_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: "raising_facility", key: "id" },
    },
    certificate_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: "certificate", key: "id" },
    },
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
