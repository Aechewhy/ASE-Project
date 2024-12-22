const express = require("express");
const router = express.Router();

const livestockProductController = require("../app/controllers/livestockProductController");

router.get("/create", livestockProductController.create);
router.post("/store", livestockProductController.store);
router.get("/:id/edit", livestockProductController.edit);
router.put("/:id", livestockProductController.update);
router.get("/:id", livestockProductController.detail);
router.delete("/:id", livestockProductController.destroy);
router.get("/", livestockProductController.livestockProduct);

module.exports = router;
