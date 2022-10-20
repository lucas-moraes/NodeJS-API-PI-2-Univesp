const request = require("supertest");
const server = require("../server");

describe("streetHole Tests", () => {
  it("/POST => Register a street hole", async () => {
    return await request(server.app)
      .post("/api/streetHole/create")
      .attach("file", Buffer.from("a".repeat(10000000)), "filename")
      .field({
        endereco: "JEST",
        estado: "São Paulo",
        cidade: "São Paulo",
        latitude: "77,77",
        longitude: "88,88",
      })
      .expect(200);
  });

  it("/GET => Get all registers", async () => {
    await request(server.app).get("/api/streetHole/findAll").expect(200);
  });

  it("/DELETEONE => Delete one register", async () => {
    return await request(server.app)
      .delete("/api/streetHole/deleteOne")
      .send({
        endereco: "JEST",
      })
      .expect(200);
  });

  it("/DELETEMANY => Delete many registers", async () => {
    return await request(server.app)
      .delete("/api/streetHole/deleteMany")
      .send({
        endereco: "JEST",
      })
      .expect(200);
  });
});
