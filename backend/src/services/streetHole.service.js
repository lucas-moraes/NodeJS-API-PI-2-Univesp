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
    });

    hole.save((err, doc) => {
      if (err) {
        console.log(err);
      }
      return doc;
    });
  }
}

module.exports = new streetHoleServices();
