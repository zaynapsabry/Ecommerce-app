const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: Array, required: true },
    price: { type: Number, required: true },
    category: {type:String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
