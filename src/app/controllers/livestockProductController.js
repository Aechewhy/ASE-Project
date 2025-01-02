const LivestockProduct = require("../models/livestockProductModel");// 1 hoa
const RaisingFacility = require("../models/raisingFacilityModel");
const { sequelizeToObject,
        mutipleSequelizeToObject
      } = require("../../util/mysql");

class LivestockProductController {//
  // [GET] /livestockProduct
  async livestockProduct(req, res, next) {
    try {
      // Tìm tất cả livestockProduct
      const livestockProduct = await LivestockProduct.findAll();// 2

      if (!livestockProduct || livestockProduct.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const livestockProducttObjects = livestockProduct.map(sequelizeToObject);

      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;
      
      const updatedlivestockProduct = livestockProducttObjects.map((livestockProduct) => ({
        ...livestockProduct,
        can_edit: isAdmin,
      }));

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./livestockProduct/livestockProduct", {
        livestockProduct: updatedlivestockProduct,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }

  //[GET] /livestockProduct/:id
  detail(req, res, next) {
    LivestockProduct.findOne({//
      where: { id: req.params.id },
      include: [
        {
          model: RaisingFacility,
          as: "raisingFacility",
          attributes: ["name"],
        },
      ],
    })
      .then((livestockProduct) => {
        res.render("./livestockProduct/detail", {
          livestockProduct: sequelizeToObject(livestockProduct),
        });
      })
      .catch(next);
  }

  //[GET] /livestockProduct/create
  create(req, res, next) {
    RaisingFacility.findAll({
      attributes: ["id", "name"],
    })
      .then((raisingFacility) => {
        res.render("./livestockProduct/create", {
          raisingFacility: mutipleSequelizeToObject(raisingFacility),
        });
      })
      .catch(next);
  }

  //[POST] /livestockProduct/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, raising_facility_id } = req.body;

    // Chuyển đổi id và livestockProduct_facility_id sang số nguyên
    const livestockProductId = parseInt(id, 10); // base 10
    const raisingFacilityId = parseInt(raising_facility_id, 10); // base 10

    // Kiểm tra dữ liệu
    if ( !name ) {
      return res
        .status(400)
        .send(
          "Thông tin không được để trống",
        );
    }

    LivestockProduct.create({//
      id: livestockProductId,
      name,
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
  LivestockProduct.findOne({//
      where: { id: req.params.id },
    }).then((livestockProduct) => {
      res.render("./livestockProduct/edit", {
        livestockProduct: sequelizeToObject(livestockProduct),
      });
    })
  .catch(next);
} 

  //[PUT] /livestockProduct/:id
  update(req, res, next) {
    // Lấy dữ liệu từ body và params
    const {name} = req.body;
    const livestockProductId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if ( !livestockProductId || !name) {
        return res.status(400).json({
            message: "Thông tin không được để trống."
        });
    }

  // Thực hiện cập nhật với điều kiện where rõ ràng
  LivestockProduct.update(//
      {
        name,
      },
      {
          where: { id: livestockProductId } // Điều kiện where
      }
  )
  .then(() => res.redirect("./"))
  .catch(next)
}

  //[DELETE] /certificate/:id
  destroy(req, res, next) {
    LivestockProduct.destroy({ where: { id: req.params.id } })//
        .then(() => res.redirect('./'))
        .catch(next);
  }






}
module.exports = new LivestockProductController();//
