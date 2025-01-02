const express = require("express");
const router = express.Router();

const wasteTreatmentFacilityController = require("../app/controllers/wasteTreatmentFacilityController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, wasteTreatmentFacilityController.create);
router.post("/store", isAdmin, wasteTreatmentFacilityController.store);
router.get("/:id/edit", isAdmin, wasteTreatmentFacilityController.edit);
router.put("/:id", isAdmin, wasteTreatmentFacilityController.update);
router.get("/:id", wasteTreatmentFacilityController.detail);
router.delete("/:id", isAdmin, wasteTreatmentFacilityController.destroy);
router.get("/", wasteTreatmentFacilityController.wasteTreatmentFacility);

module.exports = router;
