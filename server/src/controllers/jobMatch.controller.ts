import { Response } from "express";
import { AnalyzeJobMatch } from "../services/api.service";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";

export const analyzeJobMatch = async (
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

    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and job description are required.",
      });
    }

    const analysis = await AnalyzeJobMatch(
      resumeText,
      jobDescription
    );

    const savedAnalysis = await prisma.jobMatchAnalysis.create({
      data: {
        firebaseUid: req.user.uid,
        jobDescription,
        atsScore: analysis.atsScore,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        matchedKeywords: analysis.matchedKeywords,
        missingKeywords: analysis.missingKeywords,
        strengths: analysis.strengths,
        suggestions: analysis.suggestions,
      },
    });

    return res.status(200).json({
      success: true,
      analysis: savedAnalysis,
    });
  } catch (err) {
    console.error("JOB MATCH ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const getJobMatchHistory = async (
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

    const history = await prisma.jobMatchAnalysis.findMany({
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
    console.error("JOB MATCH HISTORY ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};