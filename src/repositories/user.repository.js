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

async function getAllUsers() {
  return User.find().lean();
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
