import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
    },
  });
}

export const register = async (req, res) => {
  const { fullname, email, password, isSeller = false, contact } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or contact already exists",
        success: false,
      });
    }

    const user = await userModel.create({
      fullname,
      email,
      password,
      role: isSeller ? "seller" : "buyer",
      contact,
    });

    await sendTokenResponse(user, res, "User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, contact, password } = req.body;

  if (!email && !contact) {
    return res.status(400).json({
      message: "Email or Contact is required",
      success: false,
    });
  }

  try {
    const user = await userModel
      .findOne({
        $or: [{ email }, { contact }],
      })
      .select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    await sendTokenResponse(user, res, "User logged in successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
