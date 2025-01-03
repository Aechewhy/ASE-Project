const express = require("express");
const router = express.Router();

const testingFacilityController = require("../app/controllers/testingFacilityController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, testingFacilityController.create);
router.post("/store", isAdmin, testingFacilityController.store);
router.get("/:id/edit", isAdmin, testingFacilityController.edit);
router.put("/:id", isAdmin, testingFacilityController.update);
router.get("/:id", testingFacilityController.detail);
router.delete("/:id", isAdmin, testingFacilityController.destroy);
router.get("/", testingFacilityController.testingFacility);

module.exports = router;
