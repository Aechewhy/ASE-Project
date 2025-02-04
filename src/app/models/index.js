const CertificateFacility = require("./certificateFacilityModel");
const Certificate = require("./certificateModel");
const RaisingFacility = require("./raisingFacilityModel");
const WasteTreatmentFacility = require("./wasteTreatmentFacilityModel");
const WasteTreatmentProduct = require("./wasteTreatmentProductModel");
const ProcessingFacility = require("./processingFacilityModel");
const VetFacility = require("./vetFacilityModel");
const DisposalFacility = require("./disposalFacilityModel");
const RaisingEmployee = require("./raisingEmployeeModel");
const LivestockProduct = require("./livestockProductModel");
const TestingFacility = require("./testingFacilityModel");

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
  through: "raising_certificate",
  as: "certificates",
  foreignKey: "raising_facility_id",
  otherKey: "certificate_id",
});

Certificate.belongsToMany(RaisingFacility, {
  through: "raising_certificate",
  as: "raisingFacility",
  foreignKey: "certificate_id",
  otherKey: "raising_facility_id",
});

WasteTreatmentFacility.hasMany(TestingFacility, {
  foreignKey: "facility_id",
  as: "testingFacility",
});
TestingFacility.belongsTo(WasteTreatmentFacility, {
  foreignKey: "facility_id",
  as: "wasteTreatmentFacility",
});

WasteTreatmentProduct.hasMany(TestingFacility, {
  foreignKey: "product_id",
  as: "testingFacility",
});
TestingFacility.belongsTo(WasteTreatmentProduct, {
  foreignKey: "product_id",
  as: "wasteTreatmentProduct",
});

WasteTreatmentFacility.hasMany(WasteTreatmentProduct, {
  foreignKey: "facility_id",
  as: "wasteTreatmentProduct",
});
WasteTreatmentProduct.belongsTo(WasteTreatmentFacility, {
  foreignKey: "facility_id",
  as: "wasteTreatmentFacility",
});
ProcessingFacility.belongsTo(RaisingFacility, {
  foreignKey: "raising_facility_id",
  as: "raisingFacility",
});
RaisingEmployee.belongsTo(RaisingFacility, {
  foreignKey: "raising_facility_id",
  as: "raisingFacility",
});
LivestockProduct.belongsTo(RaisingFacility, {
  foreignKey: "raising_facility_id",
  as: "raisingFacility",
});

VetFacility.hasMany(DisposalFacility, {
  foreignKey: "vet_facility_id",
  as: "disposalFacility",
});
DisposalFacility.belongsTo(VetFacility, {
  foreignKey: "vet_facility_id",
  as: "vetFacility",
});

module.exports = {
  CertificateFacility,
  Certificate,
  RaisingFacility,
  WasteTreatmentFacility,
  WasteTreatmentProduct,
  ProcessingFacility,
  VetFacility,
  DisposalFacility,
};
