const express = require("express");
const router = express.Router();

const raisingFacilityController = require("../app/controllers/raisingFacilityController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/:id/edit", raisingFacilityController.edit);
router.delete("/:id", raisingFacilityController.destroy);
router.put("/:id", raisingFacilityController.update);
router.get("/create", raisingFacilityController.create);
router.post("/store", raisingFacilityController.store);
router.get("/:id", raisingFacilityController.detail);
router.get("/", raisingFacilityController.raisingFacility);

module.exports = router;
