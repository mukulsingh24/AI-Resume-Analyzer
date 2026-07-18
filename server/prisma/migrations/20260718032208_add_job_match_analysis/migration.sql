-- CreateTable
CREATE TABLE "JobMatchAnalysis" (
    "id" SERIAL NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "jobTitle" TEXT,
    "companyName" TEXT,
    "jobDescription" TEXT NOT NULL,
    "atsScore" INTEGER NOT NULL,
    "matchedSkills" JSONB NOT NULL,
    "missingSkills" JSONB NOT NULL,
    "matchedKeywords" JSONB NOT NULL,
    "missingKeywords" JSONB NOT NULL,
    "strengths" JSONB NOT NULL,
    "suggestions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobMatchAnalysis_pkey" PRIMARY KEY ("id")
);
