import { Request, Response } from "express";

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

    console.log({
      firebaseUid,
      fullName,
      targetRole,
      experienceLevel,
      education,
      skills,
    });

    return res.status(200).json({
      success: true,
      message: "Profile received successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save profile.",
    });
  }
};