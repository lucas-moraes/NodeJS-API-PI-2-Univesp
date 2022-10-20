const Holes = require("../model/holes.model");
const { v4: uuidv4 } = require("uuid");

class streetHoleServices {
  constructor() {
    this.uuid = uuidv4();
  }
  async create(body, file) {
    const hole = Holes({
      id: this.uuid,
      endereco: body.endereco,
      estado: body.estado,
      cidade: body.cidade,
      latitude: body.latitude,
      longitude: body.longitude,
      imagem: {
        data: file.data,
        contentType: String,
      },
      closed: false,
    });

    hole.save((err, doc) => {
      if (err) {
        console.log(err);
      }
      return doc;
    });
  }

  async deleteOne(body) {
    if (body.id) return Holes.deleteOne({ id: body.id });
    if (body.endereco) return Holes.deleteOne({ endereco: body.endereco });
  }

  async deleteMany(body) {
    if (body.endereco) return Holes.deleteMany({ endereco: body.endereco });
  }

  async findAll() {
    return Holes.find({});
  }

  async update(id) {
    return Holes.updateOne({ id: id }, { closed: true });
  }
}

module.exports = new streetHoleServices();
