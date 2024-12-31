const certificateFacilityRouter = require("./certificateFacilityRoutes");
const certificateRouter = require("./certificateRoutes");
const loginRouter = require("./loginRoutes");
const aboutRouter = require("./aboutRoutes");
const processingFacilityRouter = require("./processingFacilityRoutes");
const slaughterhouseRouter = require("./slaughterhouseRoutes");
const raisingFacilityRouter = require("./raisingFacilityRoutes");
const searchRouter = require("./searchRoutes");
const siteRouter = require("./site");
const userRouter = require("./userRoutes");
const wasteTreatmentFacilityRouter = require("./wasteTreatmentFacilityRoutes");
const wasteTreatmentProductRouter = require("./wasteTreatmentProductRoutes");
const vetFacilityRouter = require("./vetFacilityRoutes");
const disposalFacilityRouter = require("./disposalFacilityRoutes");
const raisingEmployeeRouter = require("./raisingEmployeeRoutes");
const livestockProductRouter = require("./livestockProductRoutes");

function route(app) {
      app.use("/disposalFacility", disposalFacilityRouter);

  app.use("/vetFacility", vetFacilityRouter);
    app.use("/", siteRouter);
    app.use("/certificate", certificateRouter);
    app.use("/certificateFacility", certificateFacilityRouter);
    app.use("/login", loginRouter);
    app.use("/about", aboutRouter);
    app.use("/processingFacility", processingFacilityRouter);
    app.use("/raisingFacility", raisingFacilityRouter);
    app.use("/search", searchRouter);
    app.use("/slaughterhouse", slaughterhouseRouter);
    app.use("/user", userRouter);
    app.use("/wasteTreatmentFacility", wasteTreatmentFacilityRouter);
    app.use("/wasteTreatmentProduct", wasteTreatmentProductRouter);
    app.use("/raisingEmployee", raisingEmployeeRouter);
    app.use("/livestockProduct", livestockProductRouter);
}

module.exports = route;
