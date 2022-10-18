module.exports = (app) => {
  let router = require("express").Router();

  const streetHole = require("../controller/streetHole.controller.js");

  router.post("/", streetHole.create);

  app.use("/api/streetHole", router);
};
