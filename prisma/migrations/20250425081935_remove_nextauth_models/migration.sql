/*
  Warnings:

  - You are about to drop the column `discord_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `google_sub` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerk_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerk_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropIndex
DROP INDEX "users_discord_id_key";

-- DropIndex
DROP INDEX "users_google_sub_key";

-- AlterTable
ALTER TABLE "system_notices" ALTER COLUMN "publish_end_at" SET DEFAULT NOW() + INTERVAL '1 year';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "discord_id",
DROP COLUMN "email_verified",
DROP COLUMN "google_sub",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "tagline",
DROP COLUMN "username",
ADD COLUMN     "clerk_id" VARCHAR(50) NOT NULL,
ADD COLUMN     "first_name" VARCHAR(50),
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "last_name" VARCHAR(50);

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "sessions";

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_id_key" ON "users"("clerk_id");
