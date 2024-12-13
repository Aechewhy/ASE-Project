const express = require("express");
const router = express.Router();

const certificateFacilityController = require("../app/controllers/certificateFacilityController");

router.get("/", certificateFacilityController.certificateFacility);

module.exports = router;
