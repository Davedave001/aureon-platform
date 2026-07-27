-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Webinar',
    "location" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "price" TEXT NOT NULL DEFAULT 'Free',
    "capacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTicket" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_startsAt_idx" ON "Event"("startsAt");

-- CreateIndex
CREATE INDEX "Event_organizerId_idx" ON "Event"("organizerId");

-- CreateIndex
CREATE INDEX "EventTicket_userId_idx" ON "EventTicket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EventTicket_eventId_userId_key" ON "EventTicket"("eventId", "userId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTicket" ADD CONSTRAINT "EventTicket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTicket" ADD CONSTRAINT "EventTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

