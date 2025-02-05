const express = require("express"); //framework expressjs
const app = express();
const port = 999; //port
const handlebars = require("express-handlebars"); //template engine
const path = require("path"); //xử lý đường dẫn
const methodOverride = require("method-override"); //ghi đè phương thức
const route = require("../routes/index");
const session = require("express-session");
const User = require("../app/models/userModel"); //Sử dụng model User để test kết nối với database

//Cài đặt file tĩnh
app.use(express.static(path.join(__dirname, "../public")));

//Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      ifEquals: function (a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
      },
      sum: (a, b) => a + b,
      inc: function (value, options) {
        return parseInt(value) + 1;
      },
      includes: (array, value) => array.includes(value),
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware để parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Middleware làm việc với session
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  }),
);

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.log(err);
          return res.redirect('/dashboard'); // Nếu lỗi, giữ nguyên trang hiện tại
      }
      res.clearCookie('connect.sid'); // Xóa cookie session (tên mặc định của express-session)
      res.redirect('/login'); // Điều hướng về trang login
  });
});

// Middleware để truyền thông tin user vào tất cả các view
app.use((req, res, next) => {
  console.log("Session user:", req.session.user);
  res.locals.user = req.session?.user || null; // Đặt user vào res.locals nếu tồn tại, ngược lại là null
  next();
});

route(app);

//Listen
app.listen(port, () => {
  console.log(`Website đang chạy ở: http://localhost:${port}`);
});
