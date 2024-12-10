const searchRouter = require("./searchRoutes");
const editRouter = require("./editRoutes");
const siteRouter = require("./site");
const userRouter = require("./userRoutes");
const loginRouter = require("./loginRoutes");

function route(app) {
  app.use("/login", loginRouter);

  app.use("/user", userRouter);

  app.use("/edit", editRouter);

  app.use("/search", searchRouter);

  app.use("/", siteRouter);

  // app.post("/login", (req, res) => {
  //   res.send("login");
  // }); ------- Đang nghiên cứu
}

module.exports = route;
