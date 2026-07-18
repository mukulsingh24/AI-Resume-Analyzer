export interface JobMatchAnalysis {
  id: number;
  firebaseUid?: string;
  jobDescription: string;
  atsScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
  createdAt: string;
}