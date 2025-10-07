import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    max: 100,
  },
  name: {
    type: String,
    required: true,
    max: 100,
  },
  token: {
    type: String,
    max: 100,
  },
});

const User = model("User", userSchema);

export default User;
