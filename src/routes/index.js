const certificateFacilityRouter = require("./certificateFacilityRoutes");
const certificateRouter = require("./certificateRoutes");
const loginRouter = require("./loginRoutes");
const aboutRouter = require("./aboutRoutes");
const processingFacilityRouter = require("./processingFacilityRoutes");
const slaughterhouseRouter = require("./slaughterhouseRoutes");
const raisingFacilityRouter = require("./raisingFacilityRoutes");
const userRouter = require("./userRoutes");
const wasteTreatmentFacilityRouter = require("./wasteTreatmentFacilityRoutes");
const wasteTreatmentProductRouter = require("./wasteTreatmentProductRoutes");
const vetFacilityRouter = require("./vetFacilityRoutes");
const disposalFacilityRouter = require("./disposalFacilityRoutes");
const raisingEmployeeRouter = require("./raisingEmployeeRoutes");
const livestockProductRouter = require("./livestockProductRoutes");
const testingFacilityRoutes = require("./testingFacilityRoutes");
const vetPharmacyRoutes = require("./vetPharmacyRoutes");
const { isAuthenticated } = require("../app/middlewares/authMiddleware");
const { about } = require("../app/controllers/aboutController");

function route(app) {
  app.use("/testingFacility", isAuthenticated, testingFacilityRoutes);
  app.use("/vetPharmacy", isAuthenticated, vetPharmacyRoutes);
  app.use("/disposalFacility", isAuthenticated, disposalFacilityRouter);
  app.use("/vetFacility", isAuthenticated, vetFacilityRouter);
  app.use("/certificate", isAuthenticated, certificateRouter);
  app.use("/certificateFacility", isAuthenticated, certificateFacilityRouter);
  app.use("/login", loginRouter);
  app.use("/about", isAuthenticated, aboutRouter);
  app.use("/processingFacility", isAuthenticated, processingFacilityRouter);
  app.use("/raisingFacility", isAuthenticated, raisingFacilityRouter);
  app.use("/slaughterhouse", isAuthenticated, slaughterhouseRouter);
  app.use("/user", isAuthenticated, userRouter);
  app.use(
    "/wasteTreatmentFacility",
    isAuthenticated,
    wasteTreatmentFacilityRouter,
  );
  app.use(
    "/wasteTreatmentProduct",
    isAuthenticated,
    wasteTreatmentProductRouter,
  );
  app.use("/raisingEmployee", isAuthenticated, raisingEmployeeRouter);
  app.use("/livestockProduct", isAuthenticated, livestockProductRouter);
  app.use("/", isAuthenticated, aboutRouter);
}

module.exports = route;
