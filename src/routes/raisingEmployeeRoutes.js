const express = require("express");
const router = express.Router();

const raisingEmployeeController = require("../app/controllers/raisingEmployeeController");
const { isAdmin } = require("../app/middlewares/authMiddleware");

router.get("/create", isAdmin, raisingEmployeeController.create);
router.post("/store", isAdmin, raisingEmployeeController.store);
router.get("/:id/edit", isAdmin, raisingEmployeeController.edit);
router.put("/:id", isAdmin, raisingEmployeeController.update);
router.get("/:id", raisingEmployeeController.detail);
router.delete("/:id", isAdmin, raisingEmployeeController.destroy);
router.get("/", raisingEmployeeController.raisingEmployee);

module.exports = router;
