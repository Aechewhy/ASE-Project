const RaisingFacility = require("../models/raisingFacilityModel");
const Certificate = require("../models/certificateModel");
const {
  sequelizeToObject,
  mutipleSequelizeToObject,
} = require("../../util/mysql");

class RaisingFacilityController {
  // GET raisingFacility
  async raisingFacility(req, res, next) {
    try {
      const raisingFacility = await RaisingFacility.findAll();

      if (!raisingFacility || raisingFacility.length === 0) {
        return res.status(404).send("Không tìm thấy cơ sở");
      }

      const raisingFacilityObjects = raisingFacility.map(sequelizeToObject);
      const isAdmin = req.session.user?.is_admin || false;

      const updatedraisingFacility = raisingFacilityObjects.map((facility) => ({
        ...facility,
        can_edit: isAdmin,
      }));

      res.render("./raisingFacility/raisingFacility", {
        raisingFacility: updatedraisingFacility,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      next(err);
      next(err);
    }
  }

  // [GET] /raisingFacility/:id
  detail(req, res, next) {
    RaisingFacility.findOne({
      where: { id: req.params.id },
      include: [
        {
          association: RaisingFacility.associations.certificates,
          attributes: ["id", "name"],
        },
      ],
    })
      .then((raisingFacility) => {
        if (!raisingFacility) {
          return res.status(404).send("Không tìm thấy cơ sở");
        }
        res.render("./raisingFacility/detail", {
          raisingFacility: sequelizeToObject(raisingFacility),
        });
      })
      .catch(next);
  }

  // [GET] /raisingFacility/create
  create(req, res, next) {
    Certificate.findAll({ attributes: ["id", "name"] })
      .then((certificates) => {
        res.render("./raisingFacility/create", {
          certificates: mutipleSequelizeToObject(certificates),
        });
      })
      .catch(next);
  }

  // [POST] /raisingFacility/store
  store(req, res, next) {
    const {
      id,
      name,
      livestock_type,
      owner,
      location,
      size,
      employee_number,
      certificate_ids,
    } = req.body;

    const raisingFacilityId = parseInt(id, 10);
    const employeeNumber = parseInt(employee_number, 10);

    if (
      !raisingFacilityId ||
      !name ||
      !livestock_type ||
      !owner ||
      !location ||
      !size ||
      !employeeNumber
    ) {
      return res.status(400).send("Thông tin không được để trống.");
    }

    RaisingFacility.create({
      id: raisingFacilityId,
      name,
      livestock_type,
      owner,
      location,
      size,
      employee_number: employeeNumber,
    })
      .then((raisingFacility) => {
        if (certificate_ids && Array.isArray(certificate_ids)) {
          const certificateIds = certificate_ids.map((id) => parseInt(id, 10));
          return raisingFacility.setCertificates(certificateIds);
        }
      })
      .then(() => res.redirect("./"))
      .catch((error) => {
        console.error("Error storing raising facility:", error);
        next(error);
      });
  }

  // [GET] /raisingFacility/:id/edit
  edit(req, res, next) {
    Promise.all([
      RaisingFacility.findOne({
        where: { id: req.params.id },
        include: [
          {
            association: RaisingFacility.associations.certificates,
            attributes: ["id"],
          },
        ],
      }),
      Certificate.findAll({ attributes: ["id", "name"] }),
    ])
      .then(([raisingFacility, certificates]) => {
        if (!raisingFacility) {
          return res.status(404).send("Không tìm thấy cơ sở chăn nuôi.");
        }

        const raisingFacilityObject = sequelizeToObject(raisingFacility);
        const certificatesObject = mutipleSequelizeToObject(certificates);

        const selectedCertificates = raisingFacilityObject.certificates.map(
          (cert) => cert.id,
        );

        res.render("./raisingFacility/edit", {
          raisingFacility: raisingFacilityObject,
          certificates: certificatesObject,
          selectedCertificates,
        });
      })
      .catch(next);
  }

  // [PUT] /raisingFacility/:id
  update(req, res, next) {
    const {
      name,
      livestock_type,
      owner,
      location,
      size,
      employee_number,
      certificate_ids,
    } = req.body;
    const raisingFacilityId = parseInt(req.params.id, 10);

    if (
      !raisingFacilityId ||
      !name ||
      !livestock_type ||
      !owner ||
      !location ||
      !size ||
      !employee_number
    ) {
      return res
        .status(400)
        .json({ message: "Các thông tin không được để trống." });
    }

    RaisingFacility.update(
      {
        name,
        livestock_type,
        owner,
        location,
        size,
        employee_number: parseInt(employee_number, 10),
      },
      { where: { id: raisingFacilityId } },
    )
      .then(() =>
        RaisingFacility.findByPk(raisingFacilityId).then((raisingFacility) => {
          if (certificate_ids && Array.isArray(certificate_ids)) {
            const certificateIds = certificate_ids.map((id) =>
              parseInt(id, 10),
            );
            return raisingFacility.setCertificates(certificateIds);
          }
        }),
      )
      .then(() => res.redirect("/raisingFacility"))
      .catch(next);
  }

  // [DELETE] /raisingFacility/:id
  destroy(req, res, next) {
    RaisingFacility.findByPk(req.params.id)
      .then(async (raisingFacility) => {
        if (!raisingFacility) {
          return res.status(404).send("Không tìm thấy cơ sở chăn nuôi.");
        }

        // Xóa bản ghi trong bảng trung gian trước
        await raisingFacility.setCertificates([]);
        // Sau đó xóa RaisingFacility
        return RaisingFacility.destroy({ where: { id: req.params.id } });
      })
      .then(() => res.redirect("./"))
      .catch(next);
  }
}

module.exports = new RaisingFacilityController();
