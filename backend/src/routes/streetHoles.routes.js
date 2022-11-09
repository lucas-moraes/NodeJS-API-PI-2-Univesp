const streetHoleController = require("../controller/streetHole.controller.js");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/create", streetHoleController.create);
  router.put("/update", streetHoleController.update);
  router.delete("/deleteOne", streetHoleController.deleteOne);
  router.delete("/deleteMany", streetHoleController.deleteMany);
  router.patch("/closeHole/:id", streetHoleController.closeHole);
  router.get("/findAll", streetHoleController.findAll);
  router.get("/findOne", streetHoleController.findOne);

  app.use("/api/streetHole", router);
};
