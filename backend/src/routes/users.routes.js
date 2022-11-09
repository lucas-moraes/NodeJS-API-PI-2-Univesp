const UsersController = require("../controller/users.controller.js");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/create", UsersController.createUser);
  router.get("/find", UsersController.findUser);
  router.post("/login", UsersController.Login);

  app.use("/api/users", router);
};
