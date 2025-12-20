const Item = require("../models/item.model");
const mongoose = require("mongoose");

async function createItem(data) {
  return Item.create(data);
}

async function findItemById(itemId) {
  if (!mongoose.Types.ObjectId.isValid(itemId)) return null;
  return Item.findById(itemId).lean();
}

async function getAllItems(filters = {}) {
  const {
    name,
    description,
    minPrice,
    maxPrice,
    createdBy,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = filters;

  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (description) {
    query.description = { $regex: description, $options: "i" };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (createdBy && mongoose.Types.ObjectId.isValid(createdBy)) {
    query.createdBy = createdBy;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  return Item.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(Number(limit))
    .populate("createdBy", "name email")
    .lean();
}

async function updateItem(itemId, data) {
  if (!mongoose.Types.ObjectId.isValid(itemId)) return null;
  return Item.findByIdAndUpdate(itemId, data, { new: true }).lean();
}

async function deleteItem(itemId) {
  if (!mongoose.Types.ObjectId.isValid(itemId)) return null;
  return Item.findByIdAndDelete(itemId).lean();
}

async function getItemsByCreator(userId, filters = {}) {
  if (!mongoose.Types.ObjectId.isValid(userId)) return [];

  const {
    name,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = filters;

  const query = { createdBy: userId };

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  return Item.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(Number(limit))
    .lean();
}

module.exports = {
  createItem,
  findItemById,
  getAllItems,
  updateItem,
  deleteItem,
  getItemsByCreator,
};
