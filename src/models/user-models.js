import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
userSchema.index({ username: 1 }, { unique: true });
userSchema.virtual("contacts", {
  ref: "Contact",
  localField: "_id",
  foreignField: "userId",
});

const User = model("User", userSchema);

export default User;
