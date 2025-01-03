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

  // GET /user/:id
  detail(req, res, next) {
    User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        res.render("./user/detail", {
          user: sequelizeToObject(user),
        });
      })
      .catch(next);
  }

  //[GET] /certificate/create
  create(req, res, next) {
    res.render("./user/create");
  }

  //[POST] /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, email, phone_number, password, is_admin } = req.body;

    // Chuyển đổi id sang số nguyên
    const userId = parseInt(id, 10); // base 10

    // Kiểm tra dữ liệu
    if (!userId || !name || !email || !phone_number || !password) {
      return res.status(400).send("Thông tin không được để trống.");
    }

    User.create({
      id: userId,
      name,
      email,
      phone_number,
      password,
      is_admin,
    })
      .then(() => res.redirect("./"))
      .catch((error) => {
        console.error("Full Error Object:", error);
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        next(error);
      });
  }

  // GET /user/:id/edit
  edit(req, res, next) {
    User.findOne({
      where: { id: req.params.id },
    })
      .then((user) => {
        res.render("./user/edit", {
          user: sequelizeToObject(user),
        });
      })
      .catch(next);
  }

  //[PUT] /livestockProduct/:id
  update(req, res, next) {
    // Lấy dữ liệu từ body và params
    const { name, email, phone_number, password, is_admin } = req.body;
    const userId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if (!userId || !name || !email || !phone_number || !password) {
      return res.status(400).json({
        message: "Thông tin không được để trống.",
      });
    }

    // Thực hiện cập nhật với điều kiện where rõ ràng
    User.update(
      //
      {
        name,
        email,
        phone_number,
        password,
        is_admin,
      },
      {
        where: { id: userId }, // Điều kiện where
      },
    )
      .then(() => res.redirect("./"))
      .catch(next);
  }

  //[DELETE] /certificate/:id
  destroy(req, res, next) {
    User.destroy({ where: { id: req.params.id } })
      .then(() => res.redirect("./"))
      .catch(next);
  }
}

module.exports = new UserController();
