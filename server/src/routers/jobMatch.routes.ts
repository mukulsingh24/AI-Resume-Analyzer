import express from "express";
import {
  analyzeJobMatch,
  getJobMatchHistory,
} from "../controllers/jobMatch.controller";
import { verifyFirebaseToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/analyze",
  verifyFirebaseToken,
  analyzeJobMatch
);

router.get(
  "/history",
  verifyFirebaseToken,
  getJobMatchHistory
);

export default router;