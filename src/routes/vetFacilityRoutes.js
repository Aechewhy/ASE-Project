const express = require("express");
const router = express.Router();

const vetFacilityController = require("../app/controllers/vetFacilityController");

router.get("/create", vetFacilityController.create);
router.post("/store", vetFacilityController.store);
router.get("/:id/edit", vetFacilityController.edit);
router.put("/:id", vetFacilityController.update);
router.get("/:id", vetFacilityController.detail);
router.delete("/:id", vetFacilityController.destroy);
router.get("/", vetFacilityController.vetFacility);

module.exports = router;