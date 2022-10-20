const streetHoleController = require("../controller/streetHole.controller.js");

module.exports = (app) => {
  let router = require("express").Router();

  router.post("/create", streetHoleController.create);
  router.delete("/deleteOne", streetHoleController.deleteOne);
  router.delete("/deleteMany", streetHoleController.deleteMany);
  router.patch("/update/:id", streetHoleController.update);
  router.get("/findAll", streetHoleController.findAll);

  app.use("/api/streetHole", router);
};
