import express from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validator/auth.validator.js";
import { login, register, getMe } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);
router.get("/me", authenticateUser, getMe);
// router.post("/logout", logout);

export default router;
