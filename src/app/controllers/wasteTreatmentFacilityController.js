const { WasteTreatmentFacility } = require("../models");
const { WasteTreatmentProduct } = require("../models");
const { sequelizeToObject,
        mutipleSequelizeToObject
      } = require("../../util/mysql");
const { Op } = require("sequelize");

class WasteTreatmentFacilityController {
  // GET /certificateFacility
  async wasteTreatmentFacility(req, res, next) {
    try {
      // Tìm tất cả certificateFacility
      const wasteTreatmentFacility = await WasteTreatmentFacility.findAll({
        // Lấy thêm dữ liệu từ bảng liên kết
        include: [
          {
            association: WasteTreatmentFacility.associations.wasteTreatmentProduct,
          },
        ],
      });

      // Kiểm tra nếu không tìm thấy dữ liệu
      if (!wasteTreatmentFacility || wasteTreatmentFacility.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object
      const wasteTreatmentFacilityObjects =
      wasteTreatmentFacility.map(sequelizeToObject);

      // Trả về dữ liệu
      return res.render("./wasteTreatmentFacility/wasteTreatmentFacility", {
        wasteTreatmentFacility: wasteTreatmentFacilityObjects,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu certificateFacility:", err);
      return next(err);
    }
  }

  // [GET] /certificateFacility/:id
  detail(req, res, next) {
    WasteTreatmentFacility.findOne({
      where: { id: req.params.id },
      include: [
        {
          association: WasteTreatmentFacility.associations.wasteTreatmentProduct,
        },
      ],
    })
      .then((wasteTreatmentFacility) => {
        res.render("./wasteTreatmentFacility/detail", {
          wasteTreatmentFacility: sequelizeToObject(wasteTreatmentFacility),
        });
      })
      .catch(next);
  }
    
  //[GET] /certificateFacility/create
  create(req, res, next) {
    res.render("./wasteTreatmentFacility/create");
  }

  //[POST] /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, location } = req.body;

    // Chuyển đổi id sang số nguyên
    const wasteTreatmentFacilityId = parseInt(id, 10); // base 10

    // Kiểm tra dữ liệu
    if (!wasteTreatmentFacilityId || !name || !location) {
      return res
        .status(400)
        .send(
          "ID, tên và đại chỉ không được để trống.",
        );
    }

    WasteTreatmentFacility.create({
      id: wasteTreatmentFacilityId,
      name,
      location,
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
    WasteTreatmentFacility.findOne({
        where: { id: req.params.id },
      }).then((wasteTreatmentFacility) => {
        res.render("./wasteTreatmentFacility/edit", {
          wasteTreatmentFacility: sequelizeToObject(wasteTreatmentFacility),
        });
      })
    .catch(next);
  }

  //[PUT] /certificateFacility/:id
  update(req, res, next) {
    // Lấy dữ liệu từ body và params
    const { name, location } = req.body;
    const wasteTreatmentFacilityId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if ( !wasteTreatmentFacilityId || !name || !location) {
        return res.status(400).json({
            message: "ID, tên và địa chỉ không được để trống."
        });
    }

  // Thực hiện cập nhật với điều kiện where rõ ràng
  WasteTreatmentFacility.update(
      {name, location},
      {
          where: { id: wasteTreatmentFacilityId } // Điều kiện where
      }
  )
  .then(() => res.redirect("./"))
  .catch(next)
  }

  //[DELETE] /certificate/:id
  destroy(req, res, next) {
    WasteTreatmentFacility.destroy({ where: { id: req.params.id } })
        .then(() => res.redirect('./'))
        .catch(next);
  }

}

module.exports = new WasteTreatmentFacilityController();
