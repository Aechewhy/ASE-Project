const RaisingFacility = require("../models/raisingFacilityModel");
const { sequelizeToObject } = require("../../util/mysql");

class RaisingFacilityController {
  // GET raisingFacility
  async raisingFacility(req, res, next) {
    try {
      // Tìm tất cả raisingFacility
      const raisingFacility = await RaisingFacility.findAll();

      if (!raisingFacility || raisingFacility.length === 0) {
        return res.status(404).send("Không tìm thấy người dùng.");
      }

      // Chuyển đổi dữ liệu thành plain object (nếu cần)
      const raisingFacilityObjects = raisingFacility.map(sequelizeToObject);

      // Trả về dữ liệu (có thể dùng render hoặc json)
      return res.render("./raisingFacility/raisingFacility", {
        raisingFacility: raisingFacilityObjects,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", err);
      return next(err); // Truyền lỗi tới middleware xử lý lỗi
    }
  }
}

module.exports = new RaisingFacilityController();
