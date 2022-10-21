const streetHoleServices = require("../services/streetHole.service");

class StreetHoleController {
  async create(req, res) {
    const { body, files } = req;
    try {
      streetHoleServices.create(body, files);
      res.status(200).send({ message: "Registro cadastrado com sucesso" });
    } catch (err) {
      res.status(204).sed({ message: "Ocorreu um erro no cadastro" });
    }
  }

  async deleteOne(req, res) {
    const { body } = req;
    try {
      streetHoleServices.deleteOne(body);
      res.status(200).send({ message: "Registro excluído com sucesso" });
    } catch (err) {
      res.status(204).sed({ message: "Ocorreu na exclusão no cadastro" });
      console.error(err);
    }
  }

  async deleteMany(req, res) {
    const { body } = req;
    try {
      streetHoleServices.deleteMany(body);
      res.status(200).send({ message: "Registro excluído com sucesso" });
    } catch (err) {
      res.status(204).sed({ message: "Ocorreu na exclusão no cadastro" });
      console.error(err);
    }
  }

  async findAll(req, res) {
    try {
      streetHoleServices.findAll().then((response) => {
        res.status(200).send(response);
      });
    } catch (err) {
      res.status(204).send({ message: "Ocorreu um erro na consulta de dados" });
      console.error(err);
    }
  }

  async findOne(req, res) {
    try {
      streetHoleServices.findOne(req).then((response) => {
        res.status(200).send(response);
      });
    } catch (err) {
      res.status(204).send({ message: "Ocorreu um erro na consulta de dados" });
      console.error(err);
    }
  }

  async update(req, res) {
    const { body, files } = req;
    try {
      streetHoleServices.update(body, files).then((response) => {
        if (response.acknowledged) res.status(200).send({ message: "Atualização realizada com sucesso" });
      });
    } catch (err) {
      res.status(204).send({ message: "Ocorreu um erro na atualização dos dados" });
      console.error(err);
    }
  }

  async closeHole(req, res) {
    const { id } = req.params;
    try {
      streetHoleServices.closeHole(id).then((response) => {
        if (response.acknowledged) res.status(200).send({ message: "Atualização realizada com sucesso" });
      });
    } catch (err) {
      res.status(204).send({ message: "Ocorreu um erro na atualização dos dados" });
      console.error(err);
    }
  }
}

module.exports = new StreetHoleController();
