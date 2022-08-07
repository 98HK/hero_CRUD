require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://demoApi:hiteshz123@cluster0.lsdwq.mongodb.net/heroDemo";

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
