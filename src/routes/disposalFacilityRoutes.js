const express = require("express");
const router = express.Router();

const disposalFacilityController = require("../app/controllers/disposalFacilityController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, disposalFacilityController.create);
router.post("/store", isAdmin, disposalFacilityController.store);
router.get("/:id/edit", isAdmin, disposalFacilityController.edit);
router.put("/:id", isAdmin, disposalFacilityController.update);
router.delete("/:id", isAdmin, disposalFacilityController.destroy);
router.get("/:id", disposalFacilityController.detail);
router.get("/", disposalFacilityController.disposalFacility);

module.exports = router;
