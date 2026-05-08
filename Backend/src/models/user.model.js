import mongoose from "mongoose";
import addressSchema from "./address.schema.js";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    contact: { type: Number, required: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    fullname: { type: String, required: true },
    googleId: { type: String, unique: true },
    addresses: [addressSchema],
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
