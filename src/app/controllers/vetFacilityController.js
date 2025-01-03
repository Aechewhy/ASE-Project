const { VetFacility } = require("../models");
const { DisposalFacility } = require("../models");
const {
  sequelizeToObject,
  mutipleSequelizeToObject,
} = require("../../util/mysql");
const { Op } = require("sequelize");

class VetFacilityController {
  // GET /certificateFacility
  async vetFacility(req, res, next) {
    try {
      // Tìm tất cả certificateFacility
      const vetFacility = await VetFacility.findAll({
        // Lấy thêm dữ liệu từ bảng liên kết
        include: [
          {
            association: VetFacility.associations.disposalFacility,
          },
        ],
      });

      // Kiểm tra nếu không tìm thấy dữ liệu
      if (!vetFacility || vetFacility.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object
      const vetFacilityObjects = vetFacility.map(sequelizeToObject);

      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;

      const updatedvetFacility = vetFacilityObjects.map((vetFacility) => ({
        ...vetFacility,
        can_edit: isAdmin,
      }));

      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;
            
      const updatedvetFacility = vetFacilityObjects.map((vetFacility) => ({
          ...vetFacility,
          can_edit: isAdmin,
      }));

      // Trả về dữ liệu
      return res.render("./vetFacility/vetFacility", {
        vetFacility: updatedvetFacility,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu vetFacility:", err);
      return next(err);
    }
  }

  // [GET] /certificateFacility/:id
  detail(req, res, next) {
    VetFacility.findOne({
      where: { id: req.params.id },
      include: [
        {
          association: VetFacility.associations.disposalFacility,
        },
      ],
    })
      .then((vetFacility) => {
        res.render("./vetFacility/detail", {
          vetFacility: sequelizeToObject(vetFacility),
        });
      })
      .catch(next);
  }

  //[GET] /certificateFacility/create
  create(req, res, next) {
    res.render("./vetFacility/create");
  }

  //[POST] /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, location, contact_number, capacity } = req.body;

    // Chuyển đổi id sang số nguyên
    const vetFacilityId = parseInt(id, 10); // base 10

    // Kiểm tra dữ liệu
    if (!vetFacilityId || !name || !location || !contact_number || !capacity) {
      return res
        .status(400)
        .send("ID, tên, địa chỉ, sdt, số lượng không được để trống.");
    }

    VetFacility.create({
      id: vetFacilityId,
      name,
      location,
      contact_number,
      capacity,
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
    VetFacility.findOne({
      where: { id: req.params.id },
    })
      .then((vetFacility) => {
        res.render("./vetFacility/edit", {
          vetFacility: sequelizeToObject(vetFacility),
        });
      })
      .catch(next);
  }

  //[PUT] /certificateFacility/:id
  update(req, res, next) {
    // Lấy dữ liệu từ body và params
    const { name, location, contact_number, capacity } = req.body;
    const vetFacilityId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if (!vetFacilityId || !name || !location || !contact_number || !capacity) {
      return res.status(400).json({
        message: "ID, tên, địa chỉ, SDT, số lượng không được để trống.",
      });
    }

    // Thực hiện cập nhật với điều kiện where rõ ràng
    VetFacility.update(
      { name, location, contact_number, capacity },
      {
        where: { id: vetFacilityId }, // Điều kiện where
      },
    )
      .then(() => res.redirect("./"))
      .catch(next);
  }

  //[DELETE] /certificate/:id
  destroy(req, res, next) {
    VetFacility.destroy({ where: { id: req.params.id } })
      .then(() => res.redirect("./"))
      .catch(next);
  }
}

module.exports = new VetFacilityController();
