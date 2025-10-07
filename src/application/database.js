import mongoose from "mongoose";
import { logger } from "./logging.js";

export const connectDB = async () => {
  try {
    const connectionString = process.env.DATABASE_URL;
    await mongoose.connect(connectionString);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    // process.exit(1);
  }
};
