const express = require("express");
const router = express.Router();

const testingFacilityController = require("../app/controllers/testingFacilityController");

router.get("/create", testingFacilityController.create);
router.post("/store", testingFacilityController.store);
router.get("/:id/edit", testingFacilityController.edit);
router.put("/:id", testingFacilityController.update);
router.get("/:id", testingFacilityController.detail);
router.delete("/:id", testingFacilityController.destroy);
router.get("/", testingFacilityController.testingFacility);

module.exports = router;