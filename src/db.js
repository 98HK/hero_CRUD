require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, () => {
      console.error("Mongo Connected");
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectToMongo;
