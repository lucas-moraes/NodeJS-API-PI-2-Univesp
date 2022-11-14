const { PrismaClient } = require("@prisma/client");

class UsersServices {
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
  async create(body) {
    try {
      const newUser = await this.#prisma.users.create({
        data: {
          email: body.email,
          password: body.password,
        },
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async findUser(body) {
    try {
      const findUser = await this.#prisma.users.findUnique({
        where: {
          email: body.email,
        },
        select: {
          email: true,
          password: true,
        },
      });
      return findUser;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(body) {
    try {
      const deleteUser = await this.#prisma.users.delete({
        where: {
          email: body.email,
        },
      });
      return deleteUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersServices();
