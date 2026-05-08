import express from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validator/auth.validator.js";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);
// router.post("/logout", logout);

export default router;
