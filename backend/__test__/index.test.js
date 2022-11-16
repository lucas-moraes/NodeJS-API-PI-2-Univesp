const request = require("supertest");
const server = require("../server");

describe("streetHole router tests", () => {
  it("/POST => Register a street hole", async () => {
    return await request(server.app)
      .post("/api/streetHole/create")
      // .attach("imagem", Buffer.from("a".repeat(10000000)), "filename")
      .field({
        id: "JEST",
        endereco: "JEST create",
        latitude: "JEST create",
        longitude: "JEST create",
      })
      .expect(200);
  });

  it("/UPDATE => Update a register", async () => {
    return await request(server.app)
      .put("/api/streetHole/update")
      .send({
        id: "JEST",
        endereco: "JEST",
        latitude: "JEST",
        longitude: "JEST",
      })
      .expect(200);
  });

  it("/DELETEONE => Delete one register", async () => {
    return await request(server.app)
      .delete("/api/streetHole/deleteOne")
      .send({
        id: "JEST",
      })
      .expect(200);
  });

  it("/DELETEMANY => Delete many registers", async () => {
    return await request(server.app)
      .delete("/api/streetHole/deleteMany")
      .send({
        id: "JEST",
      })
      .expect(200);
  });

  it("/FINDALL => Get all registers", async () => {
    await request(server.app).get("/api/streetHole/findAll").expect(200);
  });

  it("/FINDONE => Get all registers", async () => {
    await request(server.app).get("/api/streetHole/findOne").expect(200);
  });
});

describe("user router tests", () => {
  it("/POST => Register a user", async () => {
    return await request(server.app)
      .post("/api/users/create")
      .field({
        email: "test@jest.com",
        password: "123456",
      })
      .expect(200);
  });

  it("/LOGIN => Signin a user", async () => {
    return await request(server.app)
      .post("/api/users/login")
      .field({
        email: "test@jest.com",
        password: "123456",
      })
      .expect(200);
  });

  it("/FIND => Find a user", async () => {
    return await request(server.app)
      .get("/api/users/find")
      .send({
        email: "test@jest.com",
      })
      .expect(200);
  });

  it("/DELETE => Delete a user", async () => {
    return await request(server.app)
      .delete("/api/users/delete")
      .field({
        email: "test@jest.com",
      })
      .expect(200);
  });
});
