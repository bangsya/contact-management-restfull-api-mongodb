import { connectDB } from "../src/application/database.js";
import User from "../src/models/user-models.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Contact from "../src/models/contact-models.js";

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
const getTestUser = async () => {
  return await User.findOne({ username: "test" });
};

// hapus semua conact test di database
const deleteAllContactTest = async () => {
  await Contact.deleteMany({ firstName: { $regex: "test contact" } });
};

const createTestContact = async () => {
  const testUser = await getTestUser();
  await Contact.create({
    userId: testUser._id,
    firstName: "test contact",
    lastName: "test contact",
    email: "testcontact@example.com",
    phone: "081234567890",
  });
};

const getTestContact = async () => {
  return await Contact.findOne({ firstName: "test contact" });
};

const createTestContactMany = async () => {
  const testUser = await getTestUser();
  for (let i = 0; i < 15; i++) {
    await Contact.create({
      userId: testUser._id,
      firstName: `test contact ${i}`,
      lastName: `test contact ${i}`,
      email: `testcontact${i}@example.com`,
      phone: `08123456789${i}`,
    });
  }
};

export {
  connectDBTest,
  closeDBTest,
  deleteAllUserTest,
  createTestUser,
  deleteAllContactTest,
  createTestContact,
  getTestContact,
  createTestContactMany,
};
