const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("livestock", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging
  define: {
    timestamps: false
  }
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công đến cơ sở dữ liệu."); 

    await sequelize.sync({ alter: true });
    console.log("Đồng bộ hóa thành công cơ sở dữ liệu.");
  } catch (err) {
    console.error("Không thể thiết lập cơ sở dữ liệu:", err);
    throw err; // Rethrow error to prevent app from continuing
  }
}

initializeDatabase();

module.exports = { sequelize, initializeDatabase };
