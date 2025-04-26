-- AlterTable
ALTER TABLE "system_notices" ALTER COLUMN "publish_end_at" SET DEFAULT NOW() + INTERVAL '1 year';
