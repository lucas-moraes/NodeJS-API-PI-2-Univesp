const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StreetHoleSchema = new Schema({
  id: String,
  endereco: String,
  estado: String,
  cidade: String,
  latitude: String,
  longitude: String,
  imagem: {
    data: Buffer,
    contentType: String,
  },
  closed: Boolean,
});

module.exports = new mongoose.model("Holes", StreetHoleSchema, "streetHoles");
