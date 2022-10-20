const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

class App {
  constructor() {
    this.express = express();
    this.expressJS();
    this.middlewares();
    this.mongoDB();
  }

  middlewares() {
    this.express.use(cors({ origin: "*" }));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(fileUpload());
  }

  expressJS() {
    this.express.listen("3003", () => {
      console.log(`It's running on port 3003.`);
    });
  }

  async mongoDB() {
    await mongoose
      .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Holes",
      })
      .then(() => {
        console.log("MongoDB Connected!");
      })
      .catch((err) => console.error(err));
  }
}

module.exports = new App();
