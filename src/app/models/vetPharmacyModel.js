const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

class VetPharmacy extends Model {}

VetPharmacy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(255) },
    location: { type: DataTypes.STRING(255) },
    contact_number: { type: DataTypes.STRING(20) },
    opening_hours: { type: DataTypes.STRING(100) },
  },
  {
    sequelize,
    modelName: "vet_pharmacy",
    tableName: "vet_pharmacy",
    timestamps: false,
    logging: false,
  },
);

module.exports = VetPharmacy;
