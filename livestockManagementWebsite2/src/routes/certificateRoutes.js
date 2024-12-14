const express = require("express");
const router = express.Router();

const certificateController = require("../app/controllers/certificateController");

router.get("/create", certificateController.create);
router.post("/store", certificateController.store);
router.get("/:id/edit", certificateController.edit);
router.delete("/:id", certificateController.delete);
router.put("/:id", certificateController.update);
router.get("/:id", certificateController.detail);
router.get("/", certificateController.certificate);

module.exports = router;
