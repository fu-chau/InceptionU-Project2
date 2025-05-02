import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_uri = process.env.MONGO_URI;

if (!mongo_uri) {
  throw new Error("Missing MONGO_URI in .env");
}

console.log("✅ Using MONGO_URI:", mongo_uri);

export async function connectDb() {
  await mongoose.connect(mongo_uri);
  console.log("✅ Connected to MongoDB via Mongoose");
}