import express from "express";

import { upload } from "../config/multer.config.js";

import { generateTryOnPreview } from "../controllers/ai.controller.js";

const router = express.Router();

router.post(
  "/generate-preview",

  upload.fields([
    {
      name: "person",
      maxCount: 1,
    },
    {
      name: "garment",
      maxCount: 1,
    },
  ]),

  generateTryOnPreview,
);

export default router;
