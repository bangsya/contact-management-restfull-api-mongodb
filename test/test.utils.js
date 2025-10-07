import { connectDB } from "../src/application/database.js";
import User from "../src/models/user-models.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// koneksi ke database
const connectDBTest = async () => {
  await connectDB();
};

// tutup koneksi ke database
const closeDBTest = async () => {
  await mongoose.disconnect();
};

// hapus semua user database
const deleteAllUserTest = async () => {
  await User.deleteMany({ username: { $regex: "test" } });
};

const createTestUser = async () => {
  await User.create({
    username: "test",
    password: await bcrypt.hash("test123", 10),
    name: "Test User",
    token: "test",
  });
};

export { connectDBTest, closeDBTest, deleteAllUserTest, createTestUser };
