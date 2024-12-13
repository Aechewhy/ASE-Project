const Certificate = require("../models/certificateModel");
const CertificateFacility = require("../models/certificateFacilityModel");
const { sequelizeToObject } = require("../../util/mysql");

class CertificateController {
  // GET /certificate
  async certificate(req, res, next) {
    try {
      // Tìm tất cả certificate
      const certificate = await Certificate.findAll();

      if (!certificate || certificate.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const certificateObjects = certificate.map(sequelizeToObject);

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./certificate/certificate", {
        certificate: certificateObjects,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }

  // GET /certificate/:id
  detail(req, res, next){
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
    .then(certificate => {
      res.render("./certificate/detail", {certificate: sequelizeToObject(certificate)});
    })
    .catch(next);
  }

  //GET /certificate/create
  create(req, res, next) {
    res.render("./certificate/create");
  }

  //POST /certificate/store
  store(req, res, next) {
    // Lấy dữ liệu từ body
    const { id, name, certificate_facility_id } = req.body;

    // Chuyển đổi id và certificate_facility_id sang số nguyên
    const certificateId = parseInt(id, 10); // base 10
    const facilityId = parseInt(certificate_facility_id, 10); // base 10

    // Kiểm tra dữ liệu
    if (!id || !name || !facilityId) {
      return res.status(400).send('ID, tên của chứng chỉ và ID của cơ sở chứng nhận không được để trống.');
    }

    Certificate.create({
      id: certificateId,
      name,
      certificate_facility_id: facilityId
    })
      .then(() => res.redirect('./'))
      .catch(error => {
        console.error('Full Error Object:', error);
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        next(error);
      });
  }

}
module.exports = new CertificateController();
