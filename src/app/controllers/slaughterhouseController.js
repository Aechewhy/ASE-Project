const Slaughterhouse = require("../models/slaughterhouseModel");
const { sequelizeToObject,
    mutipleSequelizeToObject } = require("../../util/mysql");

class SlaughterhouseController {
    // GET slaughterhouse
    async slaughterhouse(req, res, next) {
        try {
            // Tìm tất cả slaughterhouse
            const slaughterhouse = await Slaughterhouse.findAll();

            if (!slaughterhouse || slaughterhouse.length === 0) {
                return res.status(404).send("Không tìm thấy cơ sở");
            }

            // Chuyển đổi dữ liệu thành plain object (nếu cần)
            const slaughterhouseObjects = slaughterhouse.map(sequelizeToObject);

            // Trả về dữ liệu (có thể dùng render hoặc json)
            return res.render("./slaughterhouse/slaughterhouse", {
                slaughterhouse: slaughterhouseObjects,
            });
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu:", err);
            return next(err); // Truyền lỗi tới middleware xử lý lỗi
        }
    }

    // [GET] /slaughterhouse/:id
    detail(req, res, next) {
        Slaughterhouse.findOne({
            where: { id: req.params.id },
            // include: [
            //     {
            //         association: Slaughterhouse.associations.certificates, // Quan hệ đã định nghĩa
            //     },
            // ],
        })
            .then((slaughterhouse) => {
                if (!slaughterhouse) {
                    return res.status(404).send("Không tìm thấy cơ sở");
                }
                res.render("./slaughterhouse/detail", {
                    slaughterhouse: sequelizeToObject(slaughterhouse),
                });
            })
            .catch(next);
    }

    //[GET] /certificate/create
    create(req, res, next) {
        Slaughterhouse.findAll({
            attributes: ["id", "name"],
        })
            .then((slaughterhouse) => {
                res.render("./slaughterhouse/create", {
                    slaughterhouse: mutipleSequelizeToObject(slaughterhouse),
                });
            })
            .catch(next);
    }
    // create(req, res, next) {
    //     res.render("./slaughterhouse/create");
    // }
    //[POST] /certificate/store
    store(req, res, next) {
        // Lấy dữ liệu từ body
        const { id, name, location, contact_number, capacity } = req.body;

        // Chuyển đổi id sang số nguyên
        const slaughterhouseId = parseInt(id, 10); // base 10
        const shCapacity = parseInt(capacity, 10); // base 10

        // Kiểm tra dữ liệu
        if (
            !slaughterhouseId ||
            !name ||
            !location ||
            !contact_number ||
            !shCapacity
        ) {
            return res
                .status(400)
                .send("ID, tên và địa chỉ không được để trống.");
        }

        Slaughterhouse.create({
            id: slaughterhouseId,
            name,
            location,
            contact_number,
            capacity: shCapacity,
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
        Slaughterhouse.findOne({
            where: { id: req.params.id },
        })
            .then((slaughterhouse) => {
                res.render("./slaughterhouse/edit", {
                    slaughterhouse: sequelizeToObject(slaughterhouse),
                });
            })
            .catch(next);
    }

    //[PUT] /certificate/:id
    update(req, res, next) {
        // Lấy dữ liệu từ body và params
        const { name, location, contact_number, capacity } = req.body;
        const slaughterhouseId = parseInt(req.params.id, 10); // Sử dụng id từ URL params

        // Kiểm tra dữ liệu đầu vào
        if (
            !slaughterhouseId ||
            !name ||
            !location ||
            !contact_number ||
            !capacity
        ) {
            return res.status(400).json({
                message: "ID, tên và địa điểm không được để trống.",
            });
        }

        // Thực hiện cập nhật với điều kiện where rõ ràng
        Slaughterhouse.update(
            {
                name,
                location,
                contact_number,
                capacity,
            },
            {
                where: { id: slaughterhouseId }, // Điều kiện where
            }
        )
            .then(() => res.redirect("./"))
            .catch(next);
    }

    destroy(req, res, next) {
        Slaughterhouse.destroy({ where: { id: req.params.id } })
            .then(() => res.redirect("./"))
            .catch(next);
    }
}

module.exports = new SlaughterhouseController();
