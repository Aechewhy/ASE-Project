const express = require("express");
const router = express.Router();

const raisingFacilityController = require("../app/controllers/raisingFacilityController");

router.get("/", raisingFacilityController.raisingFacility);

module.exports = router;
