const User = require("../models/userModel");
const { sequelizeToObject } = require("../../util/mysql");

class UserController {
  // GET /user
  async user(req, res, next) {
    try {
      // Tìm tất cả user
      const users = await User.findAll();

      if (!users || users.length === 0) {
        return res.status(404).send("Không tìm thấy người dùng.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const userObjects = users.map(sequelizeToObject);

      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;
            
      const updatedusers = userObjects.map((users) => ({
          ...users,
          can_edit: isAdmin,
      }));

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./user/user", {
        users: updatedusers,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }
}

module.exports = new UserController();
