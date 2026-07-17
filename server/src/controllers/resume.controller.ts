import { Response } from "express";
import pdf from "pdf-parse";
import { AnalyzeResume } from "../services/api.service";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";

export const uploadResume = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const data = await pdf(req.file.buffer);

    const analysis = await AnalyzeResume(data.text);

    const savedAnalysis = await prisma.resumeAnalysis.create({
      data: {
        firebaseUid: req.user.uid,
        fileName: req.file.originalname,
        atsScore: analysis.atsScore,
        summary: analysis.summary,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        missingSections: analysis.missingSections,
        suggestions: analysis.suggestions,
      },
    });

    return res.status(200).json({
      success: true,
      analysis: savedAnalysis,
      resumeText: data.text,
    });
  } catch (err) {
    console.error("ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const getResumeHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const history = await prisma.resumeAnalysis.findMany({
      where: {
        firebaseUid: req.user.uid,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (err) {
    console.error("HISTORY ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};