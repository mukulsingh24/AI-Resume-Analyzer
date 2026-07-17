import express from "express";
import { saveProfile } from "../controllers/profile.controller";

const router = express.Router();

router.post("/", saveProfile);

export default router;