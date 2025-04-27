-- AlterTable
ALTER TABLE "system_notices" ALTER COLUMN "publish_end_at" SET DEFAULT NOW() + INTERVAL '1 year';

-- CreateTable
CREATE TABLE "user_daily_stats" (
    "userId" UUID NOT NULL,
    "statDate" DATE NOT NULL,
    "totalPresent" INTEGER NOT NULL,
    "monthPresent" INTEGER NOT NULL,
    "weekPresent" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,

    CONSTRAINT "user_daily_stats_pkey" PRIMARY KEY ("userId","statDate")
);

-- CreateIndex
CREATE INDEX "user_daily_stats_statDate_idx" ON "user_daily_stats"("statDate");
