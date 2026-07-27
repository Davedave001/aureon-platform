-- CreateTable
CREATE TABLE "AiRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "website" TEXT,
    "email" TEXT NOT NULL,
    "businessSize" TEXT,
    "industry" TEXT,
    "problem" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiRequest_userId_idx" ON "AiRequest"("userId");

-- AddForeignKey
ALTER TABLE "AiRequest" ADD CONSTRAINT "AiRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

