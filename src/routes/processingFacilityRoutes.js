const express = require("express");
const router = express.Router();

const processingFacilityController = require("../app/controllers/processingFacilityController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, processingFacilityController.create);
router.post("/store", isAdmin, processingFacilityController.store);
// router.get("/:id/edit", isAdmin, wasteTreatmentFacilityController.edit);
// router.put("/:id", isAdmin, wasteTreatmentFacilityController.update);
router.get("/:id", processingFacilityController.detail);
// router.delete("/:id", isAdmin, wasteTreatmentFacilityController.destroy);
router.get("/", processingFacilityController.processingFacility);

module.exports = router;
