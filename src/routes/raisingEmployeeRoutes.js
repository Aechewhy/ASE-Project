const express = require("express");
const router = express.Router();

const raisingEmployeeController = require("../app/controllers/raisingEmployeeController");

router.get("/create", raisingEmployeeController.create);
router.post("/store", raisingEmployeeController.store);
router.get("/:id/edit", raisingEmployeeController.edit);
router.put("/:id", raisingEmployeeController.update);
router.get("/:id", raisingEmployeeController.detail);
router.delete("/:id", raisingEmployeeController.destroy);
router.get("/", raisingEmployeeController.raisingEmployee);

module.exports = router;
