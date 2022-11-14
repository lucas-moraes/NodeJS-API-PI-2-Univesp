const UsersServices = require("../services/users.service");
const UserPassVerify = require("../tools/UserPassVerify");

class UsersController {
  async createUser(req, res) {
    const { body } = req;
    try {
      const result = await UsersServices.create(body);
      console.log(result);
      res.status(200).send({ message: "Registro cadastrado com sucesso" });
    } catch (error) {
      res.status(204).send({ message: "Ocorreu um erro no cadastro" });
    }
  }
  async findUser(req, res) {
    const { body } = req;
    try {
      const result = await UsersServices.findUser(body);
      res.status(200).send(result);
    } catch (error) {
      res.status(204).send({ message: "Ocorreu um erro no cadastro" });
    }
  }
  async deleteUser(req, res) {
    const { body } = req;
    try {
      const result = await UsersServices.deleteUser(body);
      if (result) {
        console.log(result);
        res.status(200).send({ message: "Usuário deletado com sucesso !" });
      }
    } catch (error) {
      res.status(204).send({ message: "Ocorreu um erro no cadastro" });
    }
  }
  async Login(req, res) {
    const { body } = req;
    try {
      const result = await UsersServices.findUser(body);

      if (result) {
        const isAuthenticated = UserPassVerify.login(body.password, result.password);
        if (isAuthenticated) return res.status(200).send({ message: "Usuário logado" });
        return res.status(204).send({ message: "Login ou senha incorretos" });
      }
      res.status(204).send({ message: "Login não encontrado" });
    } catch (error) {
      res.status(204).send({ message: "Ocorreu um erro no login" });
    }
  }
}

module.exports = new UsersController();
