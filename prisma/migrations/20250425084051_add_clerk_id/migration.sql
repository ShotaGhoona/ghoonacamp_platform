/*
  Warnings:

  - You are about to drop the column `current_tier_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_current_tier_id_fkey";

-- AlterTable
ALTER TABLE "system_notices" ALTER COLUMN "publish_end_at" SET DEFAULT NOW() + INTERVAL '1 year';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "current_tier_id",
ADD COLUMN     "currentTierId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_currentTierId_fkey" FOREIGN KEY ("currentTierId") REFERENCES "tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
