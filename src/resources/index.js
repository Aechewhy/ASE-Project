const express = require("express"); //framework expressjs
const app = express();
const port = 998; //port
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
      }
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Middleware to handle sessions
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  }),
);

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect("/login");
  }
}

// Add the login route
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Here you would normally check the username and password against your database
  if (username === "admin@gmail.com" && password === "password") {
    req.session.user = { username };
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

// Add the route for the home page with authentication check
app.get("/", isAuthenticated, (req, res) => {
  res.render("home", { admin: true }); // Pass admin variable for testing
});

route(app);

//Listen
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
