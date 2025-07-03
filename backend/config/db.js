const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://lck-manoj:T2e1ZwkG4sO6Ix5N@lck-cluster.k2fmxic.mongodb.net/dressup");

    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
