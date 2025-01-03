const Certificate = require("../models/certificateModel");
const CertificateFacility = require("../models/certificateFacilityModel");
const {
  sequelizeToObject,
  mutipleSequelizeToObject,
} = require("../../util/mysql");

class CertificateController {
  // [GET] /certificate
  async certificate(req, res, next) {
    try {
      // Tìm tất cả certificate
      const certificate = await Certificate.findAll();

      if (!certificate || certificate.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const certificateObjects = certificate.map(sequelizeToObject);
      
      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;
      
      const updatedCertificates = certificateObjects.map((certificate) => ({
        ...certificate,
        can_edit: isAdmin,
      }));

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./certificate/certificate", {
        certificate: updatedCertificates,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }

  // [GET] /certificate/:id
  detail(req, res, next) {
    Certificate.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: CertificateFacility,
          as: "certificateFacility",
          attributes: ["name"],
        },
      ],
    })
      .then((certificate) => {
        res.render("./certificate/detail", {
          certificate: sequelizeToObject(certificate),
        });
      })
      .catch(next);
  }

  //[GET] /certificate/create
  create(req, res, next) {
    CertificateFacility.findAll({
      attributes: ["id", "name"],
    })
      .then((facilities) => {
        res.render("./certificate/create", {
          certificateFacility: mutipleSequelizeToObject(facilities),
        });
      })
      .catch(next);
  }

  //[POST] /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, certificate_facility_id } = req.body;

    // Chuyển đổi id và certificate_facility_id sang số nguyên
    const certificateId = parseInt(id, 10); // base 10
    const facilityId = parseInt(certificate_facility_id, 10); // base 10

    // Kiểm tra dữ liệu
    if (!certificateId || !name) {
      return res
        .status(400)
        .send("ID và tên của chứng chỉ không được để trống.");
    }

    Certificate.create({
      id: certificateId,
      name,
      certificate_facility_id: facilityId,
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
    CertificateFacility.findAll({
      attributes: ["id", "name"], // Chỉ lấy id và name
    })
      .then((facilities) => {
        return Certificate.findOne({
          where: { id: req.params.id },
        }).then((certificate) => {
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
    const { name, certificate_facility_id } = req.body;
    const certificateId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

    // Kiểm tra dữ liệu đầu vào
    if (!certificateId || !name || !certificate_facility_id) {
      return res.status(400).json({
        message:
          "ID, tên của chứng chỉ và ID của cơ sở chứng nhận không được để trống.",
      });
    }

    // Thực hiện cập nhật với điều kiện where rõ ràng
    Certificate.update(
      {
        name,
        certificate_facility_id,
      },
      {
        where: { id: certificateId }, // Điều kiện where
      },
    )
      .then(() => res.redirect("./"))
      .catch(next);
  }

  //[DELETE] /certificate/:id
  destroy(req, res, next) {
    Certificate.destroy({ where: { id: req.params.id } })
      .then(() => res.redirect("./"))
      .catch(next);
  }
}
module.exports = new CertificateController();
