const User = require("../models/userModel");

const User = require("../models/userModel");

class LoginController {
  // POST /login - Xử lý logic đăng nhập
  async handleLogin(req, res) {
    const { email, password } = req.body;

    try {
      // Tìm người dùng từ database
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.render("login", { error: "Người dùng không tồn tại." });
      }

      // Kiểm tra mật khẩu
      if (user.password !== password) {
        return res.render("login", { error: "Mật khẩu không chính xác." });
      }

      // Lưu thông tin người dùng vào session
      req.session.user = {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin,
      };

      // Kiểm tra quyền admin
      if (user.is_admin) {
        return res.redirect("/user"); // Điều hướng admin đến /user
      } else {
        return res.redirect("/about"); // Điều hướng người dùng bình thường đến /about
      }
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new LoginController();
