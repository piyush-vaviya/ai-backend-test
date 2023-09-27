const mongoose = require("mongoose");
const { STATUS } = require("../utils/constants");

const FileSchema = {
  name: { type: String, required: true },
  path: { type: String, required: true },
};

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String },
  files: [FileSchema],
  status: { type: String, enum: Object.values(STATUS) },
});

ProductSchema.index("name sku description");

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
