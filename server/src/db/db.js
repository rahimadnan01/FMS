import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}${DB_NAME}`
    );
    console.log(
      "DB connected successfully :",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Failed to connect DB", error.message);
    process.exit(1);
  }
};
export { connectDB };
