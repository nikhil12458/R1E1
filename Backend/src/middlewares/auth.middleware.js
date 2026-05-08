import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const authenticateBuyer = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (user.role !== "buyer")
      return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const authenticateSeller = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (user.role !== "seller")
      return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (user.role !== "admin")
      return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Unauthorized" });
    next();
  };
};

export const checkProductAccess = async (req, res, next) => {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  if (!product) return res.status(404).json({ message: "Product not found" });

  if (
    req.user.role === "admin" ||
    req.user._id.toString() === product.seller.toString()
  ) {
    req.product = product;
    return next();
  }

  return res.status(403).json({ message: "Unauthorized" });
};
