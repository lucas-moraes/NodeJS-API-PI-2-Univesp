module.exports = (app) => {
  let router = require("express").Router();

  const externalAPI = require("../controller/external.controller.js");

  router.post("/getLocal", externalAPI.getLocal);

  app.use("/external", router);
};
