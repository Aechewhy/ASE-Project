const express = require("express");
const router = express.Router();

const wasteTreatmentProductController = require("../app/controllers/wasteTreatmentProductController");

router.get("/create", wasteTreatmentProductController.create);
router.post("/store", wasteTreatmentProductController.store);
router.get("/:id/edit", wasteTreatmentProductController.edit);
router.put("/:id", wasteTreatmentProductController.update);
router.delete("/:id", wasteTreatmentProductController.destroy);
router.get("/:id", wasteTreatmentProductController.detail);
router.get("/", wasteTreatmentProductController.wasteTreatmentProduct);

module.exports = router;
