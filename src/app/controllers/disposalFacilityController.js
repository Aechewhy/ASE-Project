const DisposalFacility = require("../models/disposalFacilityModel");
const VetFacility = require("../models/vetFacilityModel");
const { sequelizeToObject,
        mutipleSequelizeToObject
      } = require("../../util/mysql");
const { INTEGER } = require("sequelize");
const vetFacility = require("../models/vetFacilityModel");

class DisposalFacilityController {
  // [GET] /certificate
  async disposalFacility(req, res, next) {
    try {
      // Tìm tất cả certificate
      const disposalFacility = await DisposalFacility.findAll();

      if (!disposalFacility || disposalFacility.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const disposalFacilityObjects = disposalFacility.map(sequelizeToObject);

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./disposalFacility/disposalFacility", {
        disposalFacility: disposalFacilityObjects,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }

  // [GET] /certificate/:id
  detail(req, res, next) {
    DisposalFacility.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: VetFacility,
          as: "vetFacility",
          attributes: ["name"],
        },
      ],
    })
      .then((disposalFacility) => {
        res.render("./disposalFacility/detail", {
            disposalFacility: sequelizeToObject(disposalFacility),
        });
      })
      .catch(next);
  }

  //[GET] /certificate/create
  create(req, res, next) {
    VetFacility.findAll({
      attributes: ["id", "name"],
    })
      .then((vetFacility) => {
        res.render("./disposalFacility/create", {
            vetFacility: mutipleSequelizeToObject(vetFacility),
        });
      })
      .catch(next);
  }

  //[POST] /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, location, contact_number, capacity, vet_facility } = req.body;

    // Chuyển đổi id và certificate_facility_id sang số nguyên
    const disposalId = parseInt(id, 10); // base 10
    const facilityId = parseInt(vet_facility, 10); // base 10

    // Kiểm tra dữ liệu
    if ( !disposalId || !name || !location ) {
      return res
        .status(400)
        .send(
          "ID, tên, địa chỉ không được để trống.",
        );
    }

    DisposalFacility.create({
      id: disposalId,
      name,
      location,
      contact_number,
      capacity,
      vet_facility_id: facilityId,
    })
      .then(() => res.redirect("./"))
      .catch((error) => {
        console.error("Full Error Object:", error);
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        next(error);
      });
  }

  //[GET] /certificate/:id/edit
  edit(req, res, next) {
    VetFacility.findAll({
      attributes: ['id', 'name'], // Chỉ lấy id và name
    })
      .then((facility) => {
        return DisposalFacility.findOne({
          where: { id: req.params.id },
        })
          .then((disposalFacility) => {
            res.render("./disposalFacility/edit", {
              vetFacility: mutipleSequelizeToObject(facility),
              disposalFacility: sequelizeToObject(disposalFacility),
            });
          });
      })
      .catch(next); // Bắt lỗi nếu có bất kỳ Promise nào bị lỗi
  }  

  //[PUT] /certificate/:id
  update(req, res, next) {
    // Lấy dữ liệu từ body và params
    const { name, location, contact_number, capacity, vet_facility } = req.body;
    const disposalId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if (!disposalId || !name || !location) {
        return res.status(400).json({
            message: "ID, tên của sản phẩm và giá không được để trống."
        });
    }

  // Thực hiện cập nhật với điều kiện where rõ ràng
  DisposalFacility.update(
      {
          name,
          location,
          contact_number,
          capacity,
          vet_facility
      },
      {
          where: { id: disposalId } // Điều kiện where
      }
  )
  .then(() => res.redirect("./"))
  .catch(next)
}

  //[DELETE] /certificate/:id
  destroy(req, res, next) {
    WasteTreatmentProduct.destroy({ where: { id: req.params.id } })
        .then(() => res.redirect('./'))
        .catch(next);
  }

}
module.exports = new DisposalFacilityController();
