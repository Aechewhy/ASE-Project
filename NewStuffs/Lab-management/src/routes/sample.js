const express = require("express");
const router = express.Router();
const sampleController = require("../app/controllers/SampleController");
// const router = require("./site");

router.use("/:slug", sampleController.show);
router.get("/", sampleController.index);

module.exports = router;
