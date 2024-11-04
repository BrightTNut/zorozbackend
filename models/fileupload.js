const mongoose = require("mongoose");
require("dotenv").config();

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  about: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Product", FileSchema);
