-- CreateTable
CREATE TABLE "NewsSignal" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "author" TEXT,
    "headline" TEXT NOT NULL,
    "body" TEXT,
    "url" TEXT,
    "instrument" TEXT,
    "direction" TEXT,
    "sentiment" TEXT,
    "impact" TEXT NOT NULL DEFAULT 'medium',
    "confidence" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoTradeConfig" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "maxLot" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "instruments" TEXT,
    "minConfidence" INTEGER NOT NULL DEFAULT 70,
    "minImpact" TEXT NOT NULL DEFAULT 'high',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutoTradeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeOrder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "signalId" TEXT,
    "instrument" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "lot" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'simulated',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsSignal_createdAt_idx" ON "NewsSignal"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AutoTradeConfig_userId_key" ON "AutoTradeConfig"("userId");

-- CreateIndex
CREATE INDEX "TradeOrder_userId_createdAt_idx" ON "TradeOrder"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "AutoTradeConfig" ADD CONSTRAINT "AutoTradeConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeOrder" ADD CONSTRAINT "TradeOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeOrder" ADD CONSTRAINT "TradeOrder_signalId_fkey" FOREIGN KEY ("signalId") REFERENCES "NewsSignal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

