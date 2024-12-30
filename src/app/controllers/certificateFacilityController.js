const { CertificateFacility } = require("../models");
const { Certificate } = require("../models");
const { sequelizeToObject,
        mutipleSequelizeToObject
      } = require("../../util/mysql");
<<<<<<< Updated upstream
const { Op } = require("sequelize");
=======
>>>>>>> Stashed changes

class CertificateFacilityController {
  // GET /certificateFacility
  async certificateFacility(req, res, next) {
    try {
      // Tìm tất cả certificateFacility
      const certificateFacilities = await CertificateFacility.findAll({
        // Lấy thêm dữ liệu từ bảng liên kết
        include: [
          {
            association: CertificateFacility.associations.certificates,
          },
        ],
      });

      // Kiểm tra nếu không tìm thấy dữ liệu
      if (!certificateFacilities || certificateFacilities.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object
      const certificateFacilityObjects =
        certificateFacilities.map(sequelizeToObject);

      // Trả về dữ liệu
      return res.render("./certificateFacility/certificateFacility", {
        certificateFacility: certificateFacilityObjects,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu certificateFacility:", err);
      return next(err);
    }
  }

  // [GET] /certificateFacility/:id
  detail(req, res, next) {
    CertificateFacility.findOne({
      where: { id: req.params.id },
      include: [
        {
          association: CertificateFacility.associations.certificates,
        },
      ],
    })
      .then((certificateFacility) => {
        res.render("./certificateFacility/detail", {
          certificateFacility: sequelizeToObject(certificateFacility),
        });
      })
      .catch(next);
  }
    
  //[GET] /certificateFacility/create
  create(req, res, next) {
    res.render("./certificateFacility/create");
  }

  //[POST] /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name} = req.body;

    // Chuyển đổi id sang số nguyên
    const certificateFacilityId = parseInt(id, 10); // base 10

    // Kiểm tra dữ liệu
    if (!certificateFacilityId || !name) {
      return res
        .status(400)
        .send(
          "ID và tên không được để trống.",
        );
    }

    CertificateFacility.create({
      id: certificateFacilityId,
      name,
    })
      .then(() => res.redirect("./"))
      .catch((error) => {
        console.error("Full Error Object:", error);
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        next(error);
      });
  }

<<<<<<< Updated upstream
  // [GET] /certificateFacility/:id/edit
  edit(req, res, next) {
    Certificate.findAll({
      attributes: ["id", "name"], // Chỉ lấy id và name
    })
    .then((certificates) => {
      return CertificateFacility.findOne({
        where: { id: req.params.id },
      }).then((certificateFacility) => {
        res.render("./certificateFacility/edit", {
          certificateFacility: sequelizeToObject(certificateFacility),
          certificates: mutipleSequelizeToObject(certificates),
        });
      });
    })
    .catch(next);
  }

  //[PUT] /certificateFacility/:id
  update(req, res, next) {
    // Lấy dữ liệu từ body và params
    const { name } = req.body;
    const certificateFacilityId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if ( !certificateFacilityId || !name ) {
        return res.status(400).json({
            message: "ID và tên không được để trống."
        });
    }

  // Thực hiện cập nhật với điều kiện where rõ ràng
  CertificateFacility.update(
      {name},
      {
          where: { id: certificateFacilityId } // Điều kiện where
      }
  )
  .then(() => res.redirect("./"))
  .catch(next)
  }

  //[DELETE] /certificate/:id
  destroy(req, res, next) {
    CertificateFacility.destroy({ where: { id: req.params.id } })
        .then(() => res.redirect('./'))
        .catch(next);
  }
=======
  //[GET] /certificate/:id/edit
  edit(req, res, next) {
    CertificateFacility.findAll({
    attributes: ['id', 'name'], // Chỉ lấy id và name
  })
    .then((facilities) => {
      return Certificate.findOne({
        where: { id: req.params.id },
      })
        .then((certificate) => {
          res.render("./certificate/edit", {
            certificateFacility: mutipleSequelizeToObject(facilities),
            certificate: sequelizeToObject(certificate),
          });
        });
    })
    .catch(next); // Bắt lỗi nếu có bất kỳ Promise nào bị lỗi
}  

//[PUT] /certificate/:id
update(req, res, next) {
  // Lấy dữ liệu từ body và params
  const { name } = req.body;
  const certificateFacilityId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

  // Kiểm tra dữ liệu đầu vào
  if (!certificateFacilityId || !name ) {
      return res.status(400).json({
          message: "ID và tên của cơ sở chứng nhận không được để trống."
      });
  }

// Thực hiện cập nhật với điều kiện where rõ ràng
CertificateFacility.update(
    {
        name,
        id,
    },
    {
        where: { id: certificateId } // Điều kiện where
    }
)
.then(() => res.redirect("./"))
.catch(next)
}
>>>>>>> Stashed changes

}

module.exports = new CertificateFacilityController();
