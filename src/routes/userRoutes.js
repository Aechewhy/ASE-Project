const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/userController");

router.get("/create", userController.create);
router.post("/store", userController.store);
router.get("/:id/edit", userController.edit);
router.put("/:id", userController.update);
router.get("/:id", userController.detail);
router.delete("/:id", userController.destroy);
router.get("/", userController.user);

module.exports = router;
