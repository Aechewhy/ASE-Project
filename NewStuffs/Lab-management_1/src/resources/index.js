const express = require("express"); //framework expressjs
const app = express();
const port = 999; //port
const handlebars = require("express-handlebars"); //template engine
const path = require("path"); //xử lý đường dẫn
const meththodOverride = require("method-override"); //ghi đè phương thức
const session = require("express-session");
const route = require("../routes/index"); //xử lý route
const User = require("../app/models/userModel"); //Sử dụng model User để test kết nối với database

//Test kết nối (sau này bỏ)
// (async () => {
//   try {
//     await User.sync({ alter: true }); // Sử dụng `alter` để cập nhật bảng mà không làm mất dữ liệu
//     console.log("User table synchronized successfully.");
//   } catch (err) {
//     console.error("Error synchronizing the User table:", err);
//   }
// })();

//Cài đặt file tĩnh
app.use(express.static(path.join(__dirname, "../public")));

//Handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//Routes
route(app);

//Listen
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
