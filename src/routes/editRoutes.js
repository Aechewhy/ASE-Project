const express = require("express");
const router = express.Router();

const editController = require("../app/controllers/EditController");

router.get("/:slug", editController.show);
router.get("/", editController.edit);

module.exports = router;
