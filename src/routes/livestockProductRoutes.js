const express = require("express");
const router = express.Router();

const livestockProductController = require("../app/controllers/livestockProductController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, livestockProductController.create);
router.post("/store", isAdmin, livestockProductController.store);
router.get("/:id/edit", isAdmin, livestockProductController.edit);
router.put("/:id", isAdmin, livestockProductController.update);
router.get("/:id", livestockProductController.detail);
router.delete("/:id", isAdmin, livestockProductController.destroy);
router.get("/", livestockProductController.livestockProduct);

module.exports = router;
