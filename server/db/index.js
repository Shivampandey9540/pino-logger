import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect("");
    console.log("Db Connected");
  } catch (error) {
    console.log("Failed to Connected to database");
  }
}

export default dbConnect;
