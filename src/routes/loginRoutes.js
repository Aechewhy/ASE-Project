const express = require("express");
const router = express.Router();

const loginController = require("../app/controllers/loginController");

router.get("/", (req, res) => {
  // Lấy thông báo lỗi từ session
  const error = req.session.error;
  delete req.session.error; // Xóa thông báo lỗi sau khi lấy
  res.render("login", { error }); // Truyền thông báo lỗi vào giao diện
});

router.post("/", loginController.handleLogin);

module.exports = router;
