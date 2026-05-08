import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;