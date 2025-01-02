const express = require("express");
const router = express.Router();

const certificateController = require("../app/controllers/certificateController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, certificateController.create);
router.post("/store", isAdmin, certificateController.store);
router.get("/:id/edit", isAdmin, certificateController.edit);
router.delete("/:id", isAdmin, certificateController.destroy);
router.put("/:id", isAdmin, certificateController.update);
router.get("/:id", certificateController.detail);
router.get("/", certificateController.certificate);

module.exports = router;
