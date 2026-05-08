import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("Please provide a valid MONGO_URI");
}

if (!process.env.JWT_SECRET) {
  throw new Error("Please provide a valid JWT_SECRET");
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
};
