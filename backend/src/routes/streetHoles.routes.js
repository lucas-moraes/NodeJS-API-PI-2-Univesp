const streetHoleController = require("../controller/streetHole.controller.js");

module.exports = (app) => {
  let router = require("express").Router();

  router.post("/create", streetHoleController.create);

  app.use("/api/streetHole", router);
};
