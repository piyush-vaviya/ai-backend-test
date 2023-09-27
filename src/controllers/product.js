const mongoose = require("mongoose");
const { Product } = require("../models");
const { MISC, STATUS } = require("../utils/constants");
const { NOT_VALID, NOT_FOUND } = require("../utils/messages");
const { validateValues, transformQuery } = require("../utils");

const createProduct = async (data) => {
  validateValues(data);

  const product = new Product({ ...data, status: STATUS.DRAFT });
  await product.save();

  return { product };
};

const getProduct = async (params) => {
  const { id } = params || {};
  if (!id) throw new Error(NOT_VALID(MISC.ID));

  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) throw new Error(NOT_VALID(MISC.ID));

  const product = await Product.findById(id).lean();
  if (!product?._id) throw new Error(NOT_FOUND(MISC.PRODUCT, id));

  return { product };
};

const listProducts = async (query) => {
  const generatedQuery = Object.keys(query).length ? transformQuery(query) : {};
  const filter = generatedQuery?.filter || {};
  delete generatedQuery.filter;
  if (!generatedQuery?.limit) generatedQuery.limit = 10;

  const products = await Product.find(filter, null, generatedQuery).lean();

  return { products };
};

const updateProduct = async (params, data) => {
  const { id } = params || {};
  if (!id) throw new Error(NOT_VALID(MISC.ID));

  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) throw new Error(NOT_VALID(MISC.ID));

  validateValues(data);

  const updatedProduct = await Product.findOneAndDelete(
    { _id: id },
    { $set: data },
    { new: true }
  ).lean();
  if (!updatedProduct?._id) throw new Error(NOT_FOUND(MISC.PRODUCT, id));

  return { updatedProduct };
};

const deleteProduct = async (params) => {
  const { id } = params || {};
  if (!id) throw new Error(NOT_VALID(MISC.ID));

  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) throw new Error(NOT_VALID(MISC.ID));

  const deletedProduct = await Product.findOneAndDelete(
    { _id: id },
    { new: true }
  ).lean();
  if (!deletedProduct?._id) throw new Error(NOT_FOUND(MISC.PRODUCT, id));

  return { deletedProduct };
};

const uploadFile = async (params, file) => {
  const { id } = params || {};
  if (!id) throw new Error(NOT_VALID(MISC.ID));

  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) throw new Error(NOT_VALID(MISC.ID));

  const product = await Product.findOneAndUpdate(
    { _id: id },
    { $push: { files: { name: file.filename, path: file.path } } },
    { new: true }
  ).lean();
  if (!product?._id) throw new Error(NOT_FOUND(MISC.PRODUCT, id));

  return { product };
};

module.exports = {
  createProduct,
  getProduct,
  listProducts,
  updateProduct,
  deleteProduct,
  uploadFile,
};
