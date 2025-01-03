const TestingFacility = require("../models/testingFacilityModel");
const WasteTreatmentFacility = require("../models/wasteTreatmentFacilityModel");
const WasteTreatmentProduct = require("../models/wasteTreatmentProductModel");
const {
  sequelizeToObject,
  mutipleSequelizeToObject,
} = require("../../util/mysql");

class TestingFacilityController {
  // [GET] /testingFacility
  async testingFacility(req, res, next) {
    try {
      const testingFacility = await TestingFacility.findAll();

      if (!testingFacility || testingFacility.length === 0) {
        return res.status(404).send("Không tìm thấy dữ liệu.");
      }

      const testingFacilityObjects = testingFacility.map(sequelizeToObject);

      // Kiểm tra quyền admin từ session
      const isAdmin = req.session.user?.is_admin || false;

      const updatedstestingFacility = testingFacilityObjects.map(
        (testingFacility) => ({
          ...testingFacility,
          can_edit: isAdmin,
        }),
      );

      return res.render("./testingFacility/testingFacility", {
        testingFacility: updatedstestingFacility,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      return next(err);
    }
  }

  //[GET] /testingFacility/:id
  detail(req, res, next) {
    TestingFacility.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: WasteTreatmentFacility,
          as: "wasteTreatmentFacility",
          attributes: ["name"],
        },
        {
          model: WasteTreatmentProduct,
          as: "wasteTreatmentProduct",
          attributes: ["name"],
        },
      ],
    })
      .then((testingFacility) => {
        res.render("./testingFacility/detail", {
          testingFacility: sequelizeToObject(testingFacility),
        });
      })
      .catch(next);
  }

  //[GET] /testingFacility/create
  create(req, res, next) {
    Promise.all([
      WasteTreatmentFacility.findAll({ attributes: ["id", "name"] }),
      WasteTreatmentProduct.findAll({ attributes: ["id", "name"] }),
    ])
      .then(([facilities, products]) => {
        res.render("./testingFacility/create", {
          facilities: mutipleSequelizeToObject(facilities),
          products: mutipleSequelizeToObject(products),
        });
      })
      .catch(next);
  }

  //[POST] /testingFacility/store
  store(req, res, next) {
    const { id, name, location, facility_id, product_id } = req.body;

    const testingFacilityId = parseInt(id, 10);
    const facilityId = parseInt(facility_id, 10);
    const productId = parseInt(product_id, 10);

    if (!testingFacilityId || !name || !location || !facilityId || !productId) {
      return res.status(400).send("Thông tin không được để trống");
    }

    TestingFacility.create({
      id: testingFacilityId,
      name,
      location,
      facility_id: facilityId,
      product_id: productId,
    })
      .then(() => res.redirect("./"))
      .catch((error) => {
        console.error("Full Error Object:", error);
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        next(error);
      });
  }

  //[GET] /testingFacility/:id/edit
  edit(req, res, next) {
    Promise.all([
      WasteTreatmentFacility.findAll({ attributes: ["id", "name"] }),
      WasteTreatmentProduct.findAll({ attributes: ["id", "name"] }),
      TestingFacility.findOne({ where: { id: req.params.id } }),
    ])
      .then(([facilities, products, testingFacility]) => {
        res.render("./testingFacility/edit", {
          facilities: mutipleSequelizeToObject(facilities),
          products: mutipleSequelizeToObject(products),
          testingFacility: sequelizeToObject(testingFacility),
        });
      })
      .catch(next);
  }

  //[PUT] /testingFacility/:id
  update(req, res, next) {
    const { name, location, facility_id, product_id } = req.body;
    const testingFacilityId = parseInt(req.params.id, 10);

    if (
      !testingFacilityId ||
      !name ||
      !location ||
      !facility_id ||
      !product_id
    ) {
      return res.status(400).json({
        message: "Thông tin không được để trống.",
      });
    }

    TestingFacility.update(
      {
        name,
        location,
        facility_id: parseInt(facility_id, 10),
        product_id: parseInt(product_id, 10),
      },
      {
        where: { id: testingFacilityId },
      },
    )
      .then(() => res.redirect("./"))
      .catch(next);
  }

  //[DELETE] /testingFacility/:id
  destroy(req, res, next) {
    TestingFacility.destroy({ where: { id: req.params.id } })
      .then(() => res.redirect("./"))
      .catch(next);
  }
}

module.exports = new TestingFacilityController();
