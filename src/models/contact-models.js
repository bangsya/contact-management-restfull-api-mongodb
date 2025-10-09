import { model, Schema } from "mongoose";

const contactModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    max: 100,
  },
  lastName: {
    type: String,
    optional: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 200,
  },
  phone: {
    type: String,
    required: true,
    max: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: Object,
    optional: true,
    max: 200,
  },
});

const Contact = model("Contact", contactModel);
export default Contact;
