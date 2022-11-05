const Holes = require("../model/holes.model");
const IStreetHoles = require("../interface/IStreetHoles");
const { v4: uuidv4 } = require("uuid");

class streetHoleServices {
  #StreetHolesModel;
  #id;
  constructor() {
    this.uuid = uuidv4();
    this.#StreetHolesModel = IStreetHoles;
  }
  async create(body, file) {
    if (body.id) this.#StreetHolesModel.id = body.id;
    else this.#StreetHolesModel.id = this.uuid;
    this.#StreetHolesModel.endereco = body.endereco;
    this.#StreetHolesModel.estado = body.estado;
    this.#StreetHolesModel.cidade = body.cidade;
    this.#StreetHolesModel.latitude = body.latitude;
    this.#StreetHolesModel.longitude = body.longitude;
    // this.#StreetHolesModel.imagem = {
    //   data: file.imagem.data,
    //   contentType: file.imagem.mimetype,
    // };
    this.#StreetHolesModel.closed = false;

    const hole = Holes(this.#StreetHolesModel);

    hole.save((err, doc) => {
      if (err) {
        console.log(err);
      }
      return doc;
    });
  }

  async update(body, file) {
    this.#id = body.id;
    this.#StreetHolesModel.endereco = body.endereco;
    this.#StreetHolesModel.estado = body.estado;
    this.#StreetHolesModel.cidade = body.cidade;
    this.#StreetHolesModel.latitude = body.latitude;
    this.#StreetHolesModel.longitude = body.longitude;
    this.#StreetHolesModel.imagem = {
      data: file.imagem.data,
      contentType: file.imagem.mimetype,
    };

    return Holes.updateOne({ id: this.#id }, this.#StreetHolesModel);
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

  async findOne(req) {
    if (req.query.id) return Holes.findOne({ id: req.query.id });
    if (req.query.endereco) return Holes.findOne({ endereco: req.query.endereco });
  }

  async closeHole(id) {
    return Holes.updateOne({ id: id }, { closed: true });
  }
}

module.exports = new streetHoleServices();
