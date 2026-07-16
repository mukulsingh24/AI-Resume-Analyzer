import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
export const AnalyzeResume = async (resumeText: string) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `
You are an expert Resume Analyzer.

Analyze the resume independently without comparing it to a specific
job description.

Evaluate the resume based on overall quality, structure, clarity,
technical skills, project quality, impact, and general ATS readability.

The score represents the overall resume quality and ATS readiness,
not a job-specific ATS match score.

JSON Schema:

{
  "atsScore": number,
  "summary": string,
  "strengths": string[],
  "missingSkills": string[],
  "suggestions": string[]
}

Resume:

${resumeText}
`,
  });
  const cleaned = (response.text ?? "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Invalid JSON returned by Gemini:", cleaned);
    throw new Error("Gemini returned invalid JSON.");
  }
};