import express from "express";
import {
  saveProfile,
  getProfile,
} from "../controllers/profile.controller";

const router = express.Router();

router.post("/", saveProfile);

router.get("/:firebaseUid", getProfile);

export default router;