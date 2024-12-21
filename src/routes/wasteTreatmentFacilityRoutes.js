const express = require("express");
const router = express.Router();

const wasteTreatmentFacilityController = require("../app/controllers/wasteTreatmentFacilityController");

router.get("/create", wasteTreatmentFacilityController.create);
router.post("/store", wasteTreatmentFacilityController.store);
router.get("/:id/edit", wasteTreatmentFacilityController.edit);
router.put("/:id", wasteTreatmentFacilityController.update);
router.get("/:id", wasteTreatmentFacilityController.detail);
router.delete("/:id", wasteTreatmentFacilityController.destroy);
router.get("/", wasteTreatmentFacilityController.wasteTreatmentFacility);

module.exports = router;
