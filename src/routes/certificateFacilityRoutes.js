const express = require("express");
const router = express.Router();

const certificateFacilityController = require("../app/controllers/certificateFacilityController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, certificateFacilityController.create);
router.post("/store", isAdmin, certificateFacilityController.store);
router.get("/:id/edit", isAdmin, certificateFacilityController.edit);
router.put("/:id", isAdmin, certificateFacilityController.update);
router.get("/:id", certificateFacilityController.detail);
router.delete("/:id", isAdmin, certificateFacilityController.destroy);
router.get("/", certificateFacilityController.certificateFacility);

module.exports = router;
