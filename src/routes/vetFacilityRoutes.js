const express = require("express");
const router = express.Router();

const vetFacilityController = require("../app/controllers/vetFacilityController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, vetFacilityController.create);
router.post("/store", isAdmin, vetFacilityController.store);
router.get("/:id/edit", isAdmin, vetFacilityController.edit);
router.put("/:id", isAdmin, vetFacilityController.update);
router.get("/:id", vetFacilityController.detail);
router.delete("/:id", isAdmin, vetFacilityController.destroy);
router.get("/", vetFacilityController.vetFacility);

module.exports = router;