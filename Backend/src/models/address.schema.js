import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: Number, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    houseNo: { type: String, required: true },
    landmark: { type: String, required: true },
    street: { type: String, required: true },
    country: { type: String, required: true },
    addressType: {
      type: String,
      enum: ["home", "work", "other"],
      default: "home",
    },
  },
  { _id: true, timestamps: true },
);

export default addressSchema;
