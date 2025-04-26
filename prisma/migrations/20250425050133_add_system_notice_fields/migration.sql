/*
  Warnings:

  - You are about to drop the column `description` on the `system_notices` table. All the data in the column will be lost.
  - Added the required column `content` to the `system_notices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "system_notices" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "publish_start_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "publish_end_at" SET DEFAULT NOW() + INTERVAL '1 year';
