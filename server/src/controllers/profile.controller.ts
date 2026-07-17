import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const saveProfile = async (req: Request, res: Response) => {
  try {
    const {
      firebaseUid,
      fullName,
      targetRole,
      experienceLevel,
      education,
      skills,
    } = req.body;

    if (!firebaseUid || !fullName) {
      return res.status(400).json({
        success: false,
        message: "Firebase UID and full name are required.",
      });
    }

    const profile = await prisma.profile.upsert({
      where: {
        firebaseUid,
      },

      update: {
        fullName,
        targetRole,
        experienceLevel,
        education,
        skills,
      },

      create: {
        firebaseUid,
        fullName,
        targetRole,
        experienceLevel,
        education,
        skills,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully.",
      profile,
    });
  } catch (error) {
    console.error("Profile save error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save profile.",
    });
  }
};