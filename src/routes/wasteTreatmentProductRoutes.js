const express = require("express");
const router = express.Router();

const wasteTreatmentProductController = require("../app/controllers/wasteTreatmentProductController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, wasteTreatmentProductController.create);
router.post("/store", isAdmin, wasteTreatmentProductController.store);
router.get("/:id/edit", isAdmin, wasteTreatmentProductController.edit);
router.put("/:id", isAdmin, wasteTreatmentProductController.update);
router.delete("/:id", isAdmin, wasteTreatmentProductController.destroy);
router.get("/:id", wasteTreatmentProductController.detail);
router.get("/", wasteTreatmentProductController.wasteTreatmentProduct);

module.exports = router;
