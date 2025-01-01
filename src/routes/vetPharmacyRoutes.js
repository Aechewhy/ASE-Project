const express = require("express");
const router = express.Router();

const vetPharmacyController = require("../app/controllers/vetPharmacyController");

router.get("/create", vetPharmacyController.create);
router.post("/store", vetPharmacyController.store);
router.get("/:id/edit", vetPharmacyController.edit);
router.put("/:id", vetPharmacyController.update);
router.get("/:id", vetPharmacyController.detail);
router.delete("/:id", vetPharmacyController.destroy);
router.get("/", vetPharmacyController.vetPharmacy);

module.exports = router;