import mongoose, { model, Schema } from "mongoose";

const addressSchema = new Schema({
  label: {
    type: String,
    required: true,
    max: 100,
  },
  street: {
    type: String,
    optional: true,
    max: 250,
  },
  city: {
    type: String,
    optional: true,
    max: 100,
  },
  province: {
    type: String,
    optional: true,
    max: 100,
  },
  country: {
    type: String,
    required: true,
    max: 100,
  },
  postalCode: {
    type: String,
    optional: true,
    max: 100,
  },
});

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
  addresses: [addressSchema],
});

const Contact = model("Contact", contactModel);
export default Contact;
