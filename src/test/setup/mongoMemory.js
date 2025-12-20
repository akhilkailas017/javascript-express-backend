const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongo;

async function connect() {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
}

async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany();
  }
}

async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
}

module.exports = {
  connect,
  clearDatabase,
  closeDatabase,
};
