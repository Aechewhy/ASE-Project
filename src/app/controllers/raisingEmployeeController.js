const RaisingEmployee = require("../models/raisingEmployeeModel");// 1 hoa
const RaisingFacility = require("../models/raisingFacilityModel");
const { sequelizeToObject,
        mutipleSequelizeToObject
      } = require("../../util/mysql");

class RaisingEmployeeController {//
  // [GET] /raisingEmployee
  async raisingEmployee(req, res, next) {
    try {
      // Tìm tất cả raisingEmployee
      const raisingEmployee = await RaisingEmployee.findAll();// 2

      if (!raisingEmployee || raisingEmployee.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const raisingEmployeetObjects = raisingEmployee.map(sequelizeToObject);

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./raisingEmployee/raisingEmployee", {
        raisingEmployee: raisingEmployeetObjects,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }

  //[GET] /raisingEmployee/:id
  detail(req, res, next) {
    RaisingEmployee.findOne({//
      where: { id: req.params.id },
      include: [
        {
          model: RaisingFacility,
          as: "raisingFacility",
          attributes: ["name"],
        },
      ],
    })
      .then((raisingEmployee) => {
        res.render("./raisingEmployee/detail", {
          raisingEmployee: sequelizeToObject(raisingEmployee),
        });
      })
      .catch(next);
  }

  //[GET] /raisingEmployee/create
  create(req, res, next) {
    RaisingFacility.findAll({
      attributes: ["id", "name"],
    })
      .then((raisingFacility) => {
        res.render("./raisingEmployee/create", {
          raisingFacility: mutipleSequelizeToObject(raisingFacility),
        });
      })
      .catch(next);
  }

  //[POST] /raisingEmployee/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, role, birthday, gender, phone_number, email, raising_facility_id } = req.body;

    // Chuyển đổi id và raisingEmployee_facility_id sang số nguyên
    const raisingEmployeeId = parseInt(id, 10); // base 10
    const raisingFacilityId = parseInt(raising_facility_id, 10); // base 10

    // Kiểm tra dữ liệu
    if ( !raisingEmployeeId || !name || !role || !birthday || !gender || !phone_number || !email) {
      return res
        .status(400)
        .send(
          "Thông tin không được để trống",
        );
    }

    RaisingEmployee.create({//
      id: raisingEmployeeId,
      name,
      role,
      birthday,
      gender,
      phone_number,
      email,
      raising_facility_id: raisingFacilityId,
    })
      .then(() => res.redirect("./"))
      .catch((error) => {
        console.error("Full Error Object:", error);
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        next(error);
      });
  }


// [GET] /certificateFacility/:id/edit
edit(req, res, next) {
  RaisingEmployee.findOne({
      where: { id: req.params.id },
    }).then((raisingEmployee) => {
      res.render("./raisingEmployee/edit", {
        raisingEmployee: sequelizeToObject(raisingEmployee),
      });
    })
  .catch(next);
} 

  //[PUT] /raisingEmployee/:id
  update(req, res, next) {
    // Lấy dữ liệu từ body và params
    const {name, role, birthday, gender, phone_number, email,} = req.body;
    const raisingEmployeeId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if ( !raisingEmployeeId || !name || !role || !birthday || !gender || !phone_number || !email) {
        return res.status(400).json({
            message: "Thông tin không được để trống."
        });
    }

  // Thực hiện cập nhật với điều kiện where rõ ràng
  RaisingEmployee.update(
      {
        name,
        role,
        birthday,
        gender,
        phone_number,
        email,
      },
      {
          where: { id: raisingEmployeeId } // Điều kiện where
      }
  )
  .then(() => res.redirect("./"))
  .catch(next)
}

  //[DELETE] /certificate/:id
  destroy(req, res, next) {
    RaisingEmployee.destroy({ where: { id: req.params.id } })
        .then(() => res.redirect('./'))
        .catch(next);
  }






}
module.exports = new RaisingEmployeeController();//
