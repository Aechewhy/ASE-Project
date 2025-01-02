const User = require("../models/userModel");

class LoginController {
  // GET /login - Hiển thị form login
  login(req, res) {
    res.render("login");
  }

  // POST /login - Xử lý logic đăng nhập
  async handleLogin(req, res) {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.render("login", { error: "Người dùng không tồn tại" });
      }
  
      if (user.password !== password) {
        return res.render("login", { error: "Mật khẩu không chính xác" });
      }
  
      req.session.user = { id: user.id, email: user.email };
      res.redirect("/about");
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).send("Internal Server Error");
    }
  }  
}

module.exports = new LoginController();
