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
    } finally {
      async () => {
        await this.#prisma.$disconnect();
      };
    }
  }
  async findUser(body) {
    try {
      const findUser = await this.#prisma.users.findUnique({
        where: {
          email: body.email,
        },
      });

      return findUser;
    } catch (error) {
      throw error;
    } finally {
      async () => {
        await this.#prisma.$disconnect();
      };
    }
  }
}

module.exports = new UsersServices();
