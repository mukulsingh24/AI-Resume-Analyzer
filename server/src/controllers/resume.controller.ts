import { Request, Response } from "express";
import pdf from "pdf-parse";

export const uploadResume = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
    }

    const data = await pdf(req.file.buffer);

    return res.status(200).json({
      success: true,
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      text: data.text,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to parse resume.",
    });
  }
};