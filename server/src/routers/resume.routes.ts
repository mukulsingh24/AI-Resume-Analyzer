import express from "express";
import multer from "multer";
import {
  uploadResume,
  getResumeHistory,
} from "../controllers/resume.controller";
import { verifyFirebaseToken } from "../middleware/auth.middleware";
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  verifyFirebaseToken,
  upload.single("resume"),
  uploadResume,
);
router.get(
  "/history",
  verifyFirebaseToken,
  getResumeHistory,
);
export default router;