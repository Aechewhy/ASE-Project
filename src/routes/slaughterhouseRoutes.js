const express = require("express");
const router = express.Router();

const slaughterhouseController = require("../app/controllers/slaughterhouseController");

router.get("/create", slaughterhouseController.create);
router.post("/store", slaughterhouseController.store);
router.get("/:id/edit", slaughterhouseController.edit);
router.put("/:id", slaughterhouseController.update);
router.get("/:id", slaughterhouseController.detail);
router.delete("/:id", slaughterhouseController.destroy);
router.get("/", slaughterhouseController.slaughterhouse);

module.exports = router;
