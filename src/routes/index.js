const searchRouter = require("./searchRoutes");
const siteRouter = require("./site");
const userRouter = require("./userRoutes");
const loginRouter = require("./loginRoutes");
const raisingFacilityRouter = require("./raisingFacilityRoutes");
const certificateRouter = require("./certificateRoutes");
const certificateFacilityRouter = require("./certificateFacilityRoutes");

function route(app) {
  app.use("/certificate", certificateRouter);

  app.use("/certificateFacility", certificateFacilityRouter);

  app.use("/raisingFacility", raisingFacilityRouter);

  app.use("/login", loginRouter);

  app.use("/user", userRouter);

  app.use("/search", searchRouter);

  app.use("/", siteRouter);
}

module.exports = route;
