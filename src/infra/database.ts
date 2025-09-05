const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");
    await mongoose.connection.db
      .collection("favoritemovies")
      .createIndex({ userId: 1, title: 1 }, { unique: true });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export { connectToDatabase };