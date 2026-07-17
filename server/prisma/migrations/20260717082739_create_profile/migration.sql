-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "targetRole" TEXT,
    "experienceLevel" TEXT,
    "education" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_firebaseUid_key" ON "Profile"("firebaseUid");
