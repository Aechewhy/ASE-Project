const CertificateFacility = require("./certificateFacilityModel");
const Certificate = require("./certificateModel");

// Định nghĩa quan hệ
CertificateFacility.hasMany(Certificate, {
  foreignKey: "certificate_facility_id",
  as: "certificates",
});
Certificate.belongsTo(CertificateFacility, {
  foreignKey: "certificate_facility_id",
  as: "certificateFacility",
});

module.exports = {
  CertificateFacility,
  Certificate,
};
