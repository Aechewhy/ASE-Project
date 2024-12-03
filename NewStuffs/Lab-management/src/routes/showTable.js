const express = require("express");
const router = express.Router();
const ShowTableController = require("../app/controllers/ShowTableController");
// const router = require("./site");
router.use("/:slug", ShowTableController.show);
router.get("/", ShowTableController.index);

module.exports = router;
