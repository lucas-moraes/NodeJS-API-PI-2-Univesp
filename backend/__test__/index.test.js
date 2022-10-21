const request = require("supertest");
const server = require("../server");

describe("streetHole Tests", () => {
  it("/POST => Register a street hole", async () => {
    return await request(server.app)
      .post("/api/streetHole/create")
      .attach("imagem", Buffer.from("a".repeat(10000000)), "filename")
      .field({
        id: "JEST",
        endereco: "JEST create",
        estado: "JEST create",
        cidade: "JEST create",
        latitude: "JEST create",
        longitude: "JEST create",
      })
      .expect(200);
  });

  it("/UPDATE => Update a register", async () => {
    return await request(server.app)
      .put("/api/streetHole/update")
      .attach("imagem", Buffer.from("a".repeat(10000000)), "filename")
      .field({
        id: "JEST",
        endereco: "JEST",
        estado: "JEST",
        cidade: "JEST",
        latitude: "JEST",
        longitude: "JEST",
      })
      .expect(200);
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

  it("/FINDALL => Get all registers", async () => {
    await request(server.app).get("/api/streetHole/findAll").expect(200);
  });

  it("/FINDONE => Get all registers", async () => {
    await request(server.app).get("/api/streetHole/findOne").expect(200);
  });
});
