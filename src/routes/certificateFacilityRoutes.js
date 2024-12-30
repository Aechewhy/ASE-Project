const express = require("express");
const router = express.Router();

const certificateFacilityController = require("../app/controllers/certificateFacilityController");

router.get("/create", certificateFacilityController.create);
router.post("/store", certificateFacilityController.store);
router.get("/:id/edit", certificateFacilityController.edit);
router.put("/:id", certificateFacilityController.update);
router.get("/:id", certificateFacilityController.detail);
<<<<<<< Updated upstream
router.delete("/:id", certificateFacilityController.destroy);
=======
>>>>>>> Stashed changes
router.get("/", certificateFacilityController.certificateFacility);

module.exports = router;
