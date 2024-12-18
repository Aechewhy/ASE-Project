const WasteTreatmentProduct = require("../models/wasteTreatmentProductModel");
const WasteTreatmentFacility = require("../models/wasteTreatmentFacilityModel");
const { sequelizeToObject,
        mutipleSequelizeToObject
      } = require("../../util/mysql");

class WasteTreatmentProductController {
  // [GET] /certificate
  async wasteTreatmentProduct(req, res, next) {
    try {
      // Tìm tất cả certificate
      const wasteTreatmentProduct = await WasteTreatmentProduct.findAll();

      if (!wasteTreatmentProduct || wasteTreatmentProduct.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const wasteTreatmentProductObjects = wasteTreatmentProduct.map(sequelizeToObject);

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./wasteTreatmentProduct/wasteTreatmentProduct", {
        wasteTreatmentProduct: wasteTreatmentProductObjects,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }

  // [GET] /certificate/:id
  detail(req, res, next) {
    WasteTreatmentProduct.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: WasteTreatmentFacility,
          as: "wasteTreatmentFacility",
          attributes: ["name"],
        },
      ],
    })
      .then((wasteTreatmentProduct) => {
        res.render("./wasteTreatmentProduct/detail", {
          wasteTreatmentProduct: sequelizeToObject(wasteTreatmentProduct),
        });
      })
      .catch(next);
  }

  //[GET] /certificate/create
  create(req, res, next) {
    WasteTreatmentFacility.findAll({
      attributes: ["id", "name"],
    })
      .then((wasteTreatmentFacility) => {
        res.render("./wasteTreatmentProduct/create", {
          wasteTreatmentFacility: mutipleSequelizeToObject(wasteTreatmentFacility),
        });
      })
      .catch(next);
  }

  //[POST] /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, price, waste_treatment_facility } = req.body;

    // Chuyển đổi id và certificate_facility_id sang số nguyên
    const productId = parseInt(id, 10); // base 10
    const productPrice = parseInt(price, 10); // base 10
    const facilityId = parseInt(waste_treatment_facility, 10); // base 10

    // Kiểm tra dữ liệu
    if ( !productId || !name || !productPrice) {
      return res
        .status(400)
        .send(
          "ID, tên và giá của sản phẩm không được để trống.",
        );
    }

    WasteTreatmentProduct.create({
      id: productId,
      name,
      price,
      facility_id: facilityId,
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
    WasteTreatmentFacility.findAll({
      attributes: ['id', 'name'], // Chỉ lấy id và name
    })
      .then((facility) => {
        return WasteTreatmentProduct.findOne({
          where: { id: req.params.id },
        })
          .then((wasteTreatmentProduct) => {
            res.render("./wasteTreatmentProduct/edit", {
              wasteTreatmentFacility: mutipleSequelizeToObject(facility),
              wasteTreatmentProduct: sequelizeToObject(wasteTreatmentProduct),
            });
          });
      })
      .catch(next); // Bắt lỗi nếu có bất kỳ Promise nào bị lỗi
  }  

  //[PUT] /certificate/:id
  update(req, res, next) {
    // Lấy dữ liệu từ body và params
    const { name, price, waste_treatment_facility } = req.body;
    const productId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if (!productId || !name || !price) {
        return res.status(400).json({
            message: "ID, tên của sản phẩm và giá không được để trống."
        });
    }

  // Thực hiện cập nhật với điều kiện where rõ ràng
  WasteTreatmentProduct.update(
      {
          name,
          price,
          waste_treatment_facility
      },
      {
          where: { id: productId } // Điều kiện where
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
module.exports = new WasteTreatmentProductController();
