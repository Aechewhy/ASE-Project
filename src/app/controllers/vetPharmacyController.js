const VetPharmacy = require("../models/vetPharmacyModel");
const { sequelizeToObject, mutipleSequelizeToObject } = require("../../util/mysql");

class VetPharmacyController {
  // [GET] /vetPharmacy
  async vetPharmacy(req, res, next) {
    try {
      const vetPharmacy = await VetPharmacy.findAll();

      if (!vetPharmacy || vetPharmacy.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      const vetPharmacyObjects = vetPharmacy.map(sequelizeToObject);

      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;
            
      const updatedvetPharmacy = vetPharmacyObjects.map((vetPharmacy) => ({
          ...vetPharmacy,
          can_edit: isAdmin,
      }));

      return res.render("./vetPharmacy/vetPharmacy", {
        vetPharmacy: updatedvetPharmacy,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err);
    }
  }

  //[GET] /vetPharmacy/:id
  detail(req, res, next) {
    VetPharmacy.findOne({
      where: { id: req.params.id },
    })
      .then((vetPharmacy) => {
        res.render("./vetPharmacy/detail", {
          vetPharmacy: sequelizeToObject(vetPharmacy),
        });
      })
      .catch(next);
  }

  //[GET] /vetPharmacy/create
  create(req, res, next) {
    res.render("./vetPharmacy/create");
  }

  //[POST] /vetPharmacy/store
  store(req, res, next) {
    const { id, name, location, contact_number, opening_hours } = req.body;

    const vetPharmacyId = parseInt(id, 10);

    if (!vetPharmacyId || !name || !location || !contact_number || !opening_hours) {
      return res.status(400).send("Thông tin không được để trống");
    }

    VetPharmacy.create({
      id: vetPharmacyId,
      name,
      location,
      contact_number,
      opening_hours,
    })
      .then(() => res.redirect("./"))
      .catch((error) => {
        console.error("Full Error Object:", error);
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        next(error);
      });
  }

  //[GET] /vetPharmacy/:id/edit
  edit(req, res, next) {
    VetPharmacy.findOne({ where: { id: req.params.id } })
      .then((vetPharmacy) => {
        res.render("./vetPharmacy/edit", {
          vetPharmacy: sequelizeToObject(vetPharmacy),
        });
      })
      .catch(next);
  }

  //[PUT] /vetPharmacy/:id
  update(req, res, next) {
    const { name, location, contact_number, opening_hours } = req.body;
    const vetPharmacyId = parseInt(req.params.id, 10);

    if (!vetPharmacyId || !name || !location || !contact_number || !opening_hours) {
      return res.status(400).json({
        message: "Thông tin không được để trống.",
      });
    }

    VetPharmacy.update(
      {
        name,
        location,
        contact_number,
        opening_hours,
      },
      {
        where: { id: vetPharmacyId },
      }
    )
      .then(() => res.redirect("./"))
      .catch(next);
  }

  //[DELETE] /vetPharmacy/:id
  destroy(req, res, next) {
    VetPharmacy.destroy({ where: { id: req.params.id } })
      .then(() => res.redirect("./"))
      .catch(next);
  }
}

module.exports = new VetPharmacyController();