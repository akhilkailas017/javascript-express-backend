const User = require("../models/user.model");

async function createUser(data) {
  return User.create(data);
}

async function findUserByEmail(email) {
  return User.findOne({ email }).lean();
}

async function findUserById(userId) {
  return User.findById(userId).lean();
}

async function getAllUsers(filters = {}) {
  const {
    name,
    email,
    minAge,
    maxAge,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = filters;

  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (email) {
    query.email = email;
  }

  if (minAge || maxAge) {
    query.age = {};
    if (minAge) query.age.$gte = Number(minAge);
    if (maxAge) query.age.$lte = Number(maxAge);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  return User.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(Number(limit))
    .lean();
}

async function updateUser(userId, data) {
  return User.findByIdAndUpdate(userId, data, { new: true }).lean();
}

async function deleteUser(userId) {
  return User.findByIdAndDelete(userId).lean();
}

module.exports = {
  createUser,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  findUserByEmail,
};
