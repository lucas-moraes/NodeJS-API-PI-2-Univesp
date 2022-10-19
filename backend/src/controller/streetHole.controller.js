const streetHoleServices = require("../services/streetHole.service");

class StreetHoleController {
  async create(req, res) {
    const { body, files } = req;
    try {
      streetHoleServices.create(body, files);

      res.status(200).send({ message: "Registro cadastrado com sucesso" });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new StreetHoleController();
