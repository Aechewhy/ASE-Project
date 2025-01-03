const ProcessingFacility = require("../models/processingFacilityModel");
const RaisingFacility = require("../models/raisingFacilityModel");
const {
  sequelizeToObject,
  mutipleSequelizeToObject,
} = require("../../util/mysql");

class ProcessingFacilityController {
  // [GET] /certificate
  async processingFacility(req, res, next) {
    try {
      // Tìm tất cả certificate
      const processingFacility = await ProcessingFacility.findAll();

      if (!processingFacility || processingFacility.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const processingFacilitytObjects =
        processingFacility.map(sequelizeToObject);

      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;

      const updatedprocessingFacility = processingFacilitytObjects.map(
        (processingFacility) => ({
          ...processingFacility,
          can_edit: isAdmin,
        }),
      );

      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;
      
      const updatedprocessingFacility = processingFacilitytObjects.map((processingFacility) => ({
        ...processingFacility,
        can_edit: isAdmin,
      }));

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./processingFacility/processingFacility", {
        processingFacility: updatedprocessingFacility,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }

  //[GET] /certificate/:id
  detail(req, res, next) {
    ProcessingFacility.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: RaisingFacility,
          as: "raisingFacility",
          attributes: ["name"],
        },
      ],
    })
      .then((processingFacility) => {
        res.render("./processingFacility/detail", {
          processingFacility: sequelizeToObject(processingFacility),
        });
      })
      .catch(next);
  }

  //[GET] /certificate/create
  create(req, res, next) {
    RaisingFacility.findAll({
      attributes: ["id", "name"],
    })
      .then((raisingFacility) => {
        res.render("./processingFacility/create", {
          raisingFacility: mutipleSequelizeToObject(raisingFacility),
        });
      })
      .catch(next);
  }

  //[POST] /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, location, owner, type, raising_facility_id } = req.body;

    // Chuyển đổi id và certificate_facility_id sang số nguyên
    const processFacilityId = parseInt(id, 10); // base 10
    const raisingFacilityId = parseInt(raising_facility_id, 10); // base 10

    // Kiểm tra dữ liệu
    if (!processFacilityId || !name || !location || !owner || !type) {
      return res.status(400).send("Thông tin không được để trống");
    }

    ProcessingFacility.create({
      id: processFacilityId,
      name,
      location,
      owner,
      type,
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

  //   //[GET] /certificate/:id/edit
  //   edit(req, res, next) {
  //     raisingFacility.findAll({
  //       attributes: ['id', 'name'], // Chỉ lấy id và name
  //     })
  //       .then((facility) => {
  //         return ProcessingFacility.findOne({
  //           where: { id: req.params.id },
  //         })
  //           .then((ProcessingFacility) => {
  //             res.render("./ProcessingFacility/edit", {
  //               raisingFacility: mutipleSequelizeToObject(facility),
  //               ProcessingFacility: sequelizeToObject(ProcessingFacility),
  //             });
  //           });
  //       })
  //       .catch(next); // Bắt lỗi nếu có bất kỳ Promise nào bị lỗi
  //   }

  //   //[PUT] /certificate/:id
  //   update(req, res, next) {
  //     // Lấy dữ liệu từ body và params
  //     const { name, price, waste_treatment_facility } = req.body;
  //     const productId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

  //     // Kiểm tra dữ liệu đầu vào
  //     if (!productId || !name || !price) {
  //         return res.status(400).json({
  //             message: "ID, tên của sản phẩm và giá không được để trống."
  //         });
  //     }

  //   // Thực hiện cập nhật với điều kiện where rõ ràng
  //   ProcessingFacility.update(
  //       {
  //           name,
  //           price,
  //           waste_treatment_facility
  //       },
  //       {
  //           where: { id: productId } // Điều kiện where
  //       }
  //   )
  //   .then(() => res.redirect("./"))
  //   .catch(next)
  // }

  //   //[DELETE] /certificate/:id
  //   destroy(req, res, next) {
  //     ProcessingFacility.destroy({ where: { id: req.params.id } })
  //         .then(() => res.redirect('./'))
  //         .catch(next);
  //   }
}
module.exports = new ProcessingFacilityController();
