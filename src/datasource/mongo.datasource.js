const mongoose = require('mongoose');
const config = require('../config/config');

async function connectMongo() {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(config.db.mongoUrl, {
      autoIndex: false
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = {
  connectMongo
};
