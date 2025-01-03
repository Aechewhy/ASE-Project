const express = require("express");
const router = express.Router();

const slaughterhouseController = require("../app/controllers/slaughterhouseController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, slaughterhouseController.create);
router.post("/store", isAdmin, slaughterhouseController.store);
router.get("/:id/edit", isAdmin, slaughterhouseController.edit);
router.put("/:id", isAdmin, slaughterhouseController.update);
router.get("/:id", slaughterhouseController.detail);
router.delete("/:id", isAdmin, slaughterhouseController.destroy);
router.get("/", slaughterhouseController.slaughterhouse);

module.exports = router;
