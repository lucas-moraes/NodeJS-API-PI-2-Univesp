import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StreetHoleSchema = new Schema({
  endereco: String,
  estado: String,
  cidade: String,
  latitude: Number,
  longitude: Number,
  imagem: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("Holes", StreetHoleSchema);
