const express = require("express");
const router = express.Router();

const raisingFacilityController = require("../app/controllers/raisingFacilityController");

router.get("/:id", raisingFacilityController.detail);
router.get("/", raisingFacilityController.raisingFacility);

module.exports = router;
