"use strict";

const mongoose = require("mongoose");
const Item = require("../models/item.model");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const toNumber = (value, defaultValue) => {
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
};

const buildPriceQuery = (minPrice, maxPrice) => {
  if (minPrice == null && maxPrice == null) return undefined;

  const priceQuery = {};
  if (minPrice != null) priceQuery.$gte = toNumber(minPrice);
  if (maxPrice != null) priceQuery.$lte = toNumber(maxPrice);

  return priceQuery;
};

const buildPagination = ({ page = 1, limit = 10 }) => {
  const safeLimit = Math.min(toNumber(limit, 10), 100);
  const safePage = Math.max(toNumber(page, 1), 1);

  return {
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
    page: safePage,
  };
};

const buildSort = ({ sortBy = "createdAt", order = "desc" }) => ({
  [sortBy]: order === "asc" ? 1 : -1,
});

async function createItem(data, options = {}) {
  return Item.create([data], options).then((res) => res[0]);
}

async function findItemById(itemId) {
  if (!isValidObjectId(itemId)) return null;

  return Item.findById(itemId).lean({ virtuals: true });
}

async function updateItemPatch(itemId, data, options = {}) {
  if (!isValidObjectId(itemId)) return null;

  return Item.findByIdAndUpdate(
    itemId,
    { $set: data },
    {
      new: true,
      runValidators: true,
      ...options,
    },
  ).lean();
}

async function updateItemPut(itemId, data, options = {}) {
  if (!isValidObjectId(itemId)) return null;

  return Item.findOneAndReplace({ _id: itemId }, data, {
    new: true,
    runValidators: true,
    overwrite: true,
    ...options,
  }).lean();
}

async function deleteItem(itemId, options = {}) {
  if (!isValidObjectId(itemId)) return null;

  return Item.findByIdAndDelete(itemId, options).lean();
}

async function getItemsByCreator(userId, filters = {}) {
  if (!isValidObjectId(userId)) {
    return { data: [], total: 0 };
  }

  const { name, minPrice, maxPrice } = filters;

  const { limit, skip, page } = buildPagination(filters);
  const sort = buildSort(filters);

  const query = {
    createdBy: userId,
  };

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  const priceQuery = buildPriceQuery(minPrice, maxPrice);
  if (priceQuery) query.price = priceQuery;

  const [data, total] = await Promise.all([
    Item.find(query).sort(sort).skip(skip).limit(limit).lean(),
    Item.countDocuments(query),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
    },
  };
}

async function getAllItems(filters = {}) {
  const { name, description, minPrice, maxPrice, createdBy } = filters;

  const { limit, skip, page } = buildPagination(filters);
  const sort = buildSort(filters);

  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (description) {
    query.description = { $regex: description, $options: "i" };
  }

  const priceQuery = buildPriceQuery(minPrice, maxPrice);
  if (priceQuery) query.price = priceQuery;

  if (createdBy && isValidObjectId(createdBy)) {
    query.createdBy = createdBy;
  }

  const [data, total] = await Promise.all([
    Item.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email")
      .lean(),
    Item.countDocuments(query),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
    },
  };
}
module.exports = {
  createItem,
  findItemById,
  updateItemPatch,
  updateItemPut,
  deleteItem,
  getItemsByCreator,
  getAllItems,
};
