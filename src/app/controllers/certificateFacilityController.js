const { CertificateFacility } = require("../models");
const { sequelizeToObject } = require("../../util/mysql");

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
}

module.exports = new CertificateFacilityController();
