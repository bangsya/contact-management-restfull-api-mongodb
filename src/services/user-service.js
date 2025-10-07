import {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import User from "../models/user-models.js";
import ResponseError from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  // validasi
  const user = validate(registerUserValidation, request);

  // cek apakah sudah ada user
  const existingUser = await User.findOne({ username: user.username });
  if (existingUser) {
    throw new ResponseError(400, "Username already exists");
  }

  // hash password
  user.password = await bcrypt.hash(user.password, 10);

  // save user
  const newUser = await User.create(user);

  return {
    _id: newUser._id,
    username: newUser.username,
    name: newUser.name,
  };
};

const login = async (request) => {
  // validasi
  const loginUser = validate(loginUserValidation, request);

  // cek apakah user ada
  const user = await User.findOne({ username: loginUser.username });
  if (!user) {
    throw new ResponseError(400, "Username or password is wrong");
  }

  // Cek apakah password sesuai
  const isPasswordValid = await bcrypt.compare(
    loginUser.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(400, "Username or password is wrong");
  }

  // membuat token di username tersebut
  const token = uuid();
  await User.updateOne({ username: loginUser.username }, { token });
  return {
    token,
  };
};

// get user
const get = async (username) => {
  // validasi
  validate(getUserValidation, username);

  // cek apakah user ada
  const user = await User.findOne({ username });
  if (!user) {
    throw new ResponseError(404, "Username not found");
  }

  return {
    _id: user._id,
    username: user.username,
    name: user.name,
  };
};

// Update user
const update = async (_id, request) => {
  const updateUser = validate(updateUserValidation, request);
  const oldData = await User.findById(_id);
  if (!oldData) {
    throw new ResponseError(404, "User not found");
  }
  const data = {};
  if (updateUser.name) {
    data.name = updateUser.name;
  }
  if (updateUser.password) {
    data.password = await bcrypt.hash(updateUser.password, 10);
  }
  if (updateUser.username) {
    data.username = updateUser.username;
  }
  const updatedUser = await User.updateOne({ _id: oldData._id }, data);
  if (!updatedUser) {
    throw new ResponseError(400, "Failed to update user");
  }

  // Get updated user data
  const newData = await User.findById(_id);
  return {
    _id: newData._id,
    username: newData.username,
    name: newData.name,
  };
};

const logout = async (username) => {
  // validasi
  username = validate(getUserValidation, username);

  // cek username ada atau tidak
  const user = await User.findOne({ username });
  if (!user) {
    throw new ResponseError(404, "Username not found");
  }

  // update token menjadi null
  return await User.updateOne({ username: user.username }, { token: null });
};

export default { register, login, get, update, logout };
