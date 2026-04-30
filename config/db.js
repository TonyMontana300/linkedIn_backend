import mongoose from "mongoose";
import process from "process";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
