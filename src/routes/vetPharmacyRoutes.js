const express = require("express");
const router = express.Router();

const vetPharmacyController = require("../app/controllers/vetPharmacyController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, vetPharmacyController.create);
router.post("/store", isAdmin, vetPharmacyController.store);
router.get("/:id/edit", isAdmin, vetPharmacyController.edit);
router.put("/:id", isAdmin, vetPharmacyController.update);
router.get("/:id", vetPharmacyController.detail);
router.delete("/:id", isAdmin, vetPharmacyController.destroy);
router.get("/", vetPharmacyController.vetPharmacy);

module.exports = router;
