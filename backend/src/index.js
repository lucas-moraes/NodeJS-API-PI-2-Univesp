const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

class App {
  constructor() {
    this.express = express();
    this.expressJS();
    this.middlewares;
    this.mongoDB();
  }

  static middlewares() {
    this.express.use(cors({ origin: "*" }));
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
  }

  expressJS() {
    this.express.listen("3003", () => {
      console.info(`It's running on port 3003.`);
    });
  }

  async mongoDB() {
    await mongoose
      .connect(process.env.MONGO_DB)
      .then(() => {
        console.info("MongoDB Connected!");
      })
      .catch((err) => console.error(err));
  }
}

module.exports = new App();
