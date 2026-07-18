export interface Analysis {
  id?: number;
  firebaseUid?: string;
  fileName?: string | null;
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSections: string[];
  suggestions: string[];
  createdAt?: string;
}