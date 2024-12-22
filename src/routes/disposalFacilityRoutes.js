const express = require("express");
const router = express.Router();

const disposalFacilityController = require("../app/controllers/disposalFacilityController");

router.get("/create", disposalFacilityController.create);
router.post("/store", disposalFacilityController.store);
router.get("/:id/edit", disposalFacilityController.edit);
router.put("/:id", disposalFacilityController.update);
router.delete("/:id", disposalFacilityController.destroy);
router.get("/:id", disposalFacilityController.detail);
router.get("/", disposalFacilityController.disposalFacility);

module.exports = router;
