const express = require("express");
const router = express.Router();

const processingFacilityController = require("../app/controllers/processingFacilityController");

router.get("/create", processingFacilityController.create);
router.post("/store", processingFacilityController.store);
// router.get("/:id/edit", wasteTreatmentFacilityController.edit);
// router.put("/:id", wasteTreatmentFacilityController.update);
router.get("/:id", processingFacilityController.detail);
// router.delete("/:id", wasteTreatmentFacilityController.destroy);
router.get("/", processingFacilityController.processingFacility);

module.exports = router;
