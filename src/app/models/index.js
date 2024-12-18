const CertificateFacility = require("./certificateFacilityModel");
const Certificate = require("./certificateModel");
const RaisingFacility = require("./raisingFacilityModel");

// Định nghĩa quan hệ
CertificateFacility.hasMany(Certificate, {
  foreignKey: "certificate_facility_id",
  as: "certificates",
});
Certificate.belongsTo(CertificateFacility, {
  foreignKey: "certificate_facility_id",
  as: "certificateFacility",
});

RaisingFacility.belongsToMany(Certificate, {
  through: 'raising_certificate',
  as: 'certificates', 
  foreignKey: 'raising_facility_id',
  otherKey: 'certificate_id',       
});

Certificate.belongsToMany(RaisingFacility, {
  through: 'raising_certificate',
  as: 'raisingFacility',
  foreignKey: 'certificate_id',
  otherKey: 'raising_facility_id',
});

module.exports = {
  CertificateFacility,
  Certificate,
  RaisingFacility,
};
