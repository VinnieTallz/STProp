-- CreateTable
CREATE TABLE "locks"."locks" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "batteryLevel" INTEGER,
    "location" TEXT,
    "manufacturer" TEXT,
    "model" TEXT,
    "capabilities" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locks"."schedules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "daysOfWeek" INTEGER[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deviceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lockId" TEXT,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locks"."access_codes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ongoing',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deviceId" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lockId" TEXT,

    CONSTRAINT "access_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locks"."audit_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "deviceId" TEXT,
    "userId" TEXT,
    "details" JSONB,
    "success" BOOLEAN NOT NULL,
    "error" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockId" TEXT,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "locks_deviceId_key" ON "locks"."locks"("deviceId");

-- AddForeignKey
ALTER TABLE "locks"."schedules" ADD CONSTRAINT "schedules_lockId_fkey" FOREIGN KEY ("lockId") REFERENCES "locks"."locks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locks"."access_codes" ADD CONSTRAINT "access_codes_lockId_fkey" FOREIGN KEY ("lockId") REFERENCES "locks"."locks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locks"."audit_logs" ADD CONSTRAINT "audit_logs_lockId_fkey" FOREIGN KEY ("lockId") REFERENCES "locks"."locks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
