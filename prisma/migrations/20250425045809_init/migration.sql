/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "google_sub" TEXT,
    "discord_id" VARCHAR(30),
    "username" VARCHAR(40) NOT NULL,
    "full_name" VARCHAR(80) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "avatar_url" TEXT,
    "tagline" VARCHAR(120),
    "current_tier_id" INTEGER,
    "role" VARCHAR(10) NOT NULL DEFAULT 'USER',
    "status" VARCHAR(12) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "last_login_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiers" (
    "id" SERIAL NOT NULL,
    "level" SMALLINT NOT NULL,
    "min_days" INTEGER NOT NULL,
    "max_days" INTEGER,
    "title_en" VARCHAR(40) NOT NULL,
    "title_ja" VARCHAR(40) NOT NULL,
    "badge_color" VARCHAR(10) NOT NULL,
    "card_image_url" TEXT NOT NULL,

    CONSTRAINT "tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_rivals" (
    "user_id" UUID NOT NULL,
    "rival_user_id" UUID NOT NULL,
    "set_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_rivals_pkey" PRIMARY KEY ("user_id","rival_user_id")
);

-- CreateTable
CREATE TABLE "weekly_goals" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "week_start" DATE NOT NULL,
    "content" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "is_past" BOOLEAN NOT NULL DEFAULT false,
    "reflection" TEXT,

    CONSTRAINT "weekly_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_memos" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "user_memos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_logs" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "attended_date" DATE NOT NULL,
    "status" VARCHAR(8) NOT NULL DEFAULT 'PRESENT',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "attendance_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "morning_events" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "description" TEXT NOT NULL,
    "host_user_id" UUID NOT NULL,
    "start_at" TIMESTAMPTZ NOT NULL,
    "end_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "morning_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "morning_event_participants" (
    "event_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,
    "joined_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceled_at" TIMESTAMPTZ,

    CONSTRAINT "morning_event_participants_pkey" PRIMARY KEY ("event_id","user_id")
);

-- CreateTable
CREATE TABLE "morning_event_tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "color" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "morning_event_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "morning_event_on_tags" (
    "event_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "morning_event_on_tags_pkey" PRIMARY KEY ("event_id","tag_id")
);

-- CreateTable
CREATE TABLE "external_events" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "host_user_id" UUID NOT NULL,
    "start_at" TIMESTAMPTZ NOT NULL,
    "end_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "external_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_event_tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "color" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "external_event_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_event_on_tags" (
    "event_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "external_event_on_tags_pkey" PRIMARY KEY ("event_id","tag_id")
);

-- CreateTable
CREATE TABLE "system_notices" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "publish_start_at" TIMESTAMPTZ NOT NULL,
    "publish_end_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "system_notices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_notice_tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "color" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "system_notice_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_notice_on_tags" (
    "notice_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "system_notice_on_tags_pkey" PRIMARY KEY ("notice_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_google_sub_key" ON "users"("google_sub");

-- CreateIndex
CREATE UNIQUE INDEX "users_discord_id_key" ON "users"("discord_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "morning_event_tags_name_key" ON "morning_event_tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "external_event_tags_name_key" ON "external_event_tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "system_notice_tags_name_key" ON "system_notice_tags"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_current_tier_id_fkey" FOREIGN KEY ("current_tier_id") REFERENCES "tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rivals" ADD CONSTRAINT "user_rivals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rivals" ADD CONSTRAINT "user_rivals_rival_user_id_fkey" FOREIGN KEY ("rival_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_goals" ADD CONSTRAINT "weekly_goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_memos" ADD CONSTRAINT "user_memos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_logs" ADD CONSTRAINT "attendance_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "morning_events" ADD CONSTRAINT "morning_events_host_user_id_fkey" FOREIGN KEY ("host_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "morning_event_participants" ADD CONSTRAINT "morning_event_participants_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "morning_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "morning_event_participants" ADD CONSTRAINT "morning_event_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "morning_event_on_tags" ADD CONSTRAINT "morning_event_on_tags_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "morning_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "morning_event_on_tags" ADD CONSTRAINT "morning_event_on_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "morning_event_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_events" ADD CONSTRAINT "external_events_host_user_id_fkey" FOREIGN KEY ("host_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_event_on_tags" ADD CONSTRAINT "external_event_on_tags_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "external_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_event_on_tags" ADD CONSTRAINT "external_event_on_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "external_event_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_notice_on_tags" ADD CONSTRAINT "system_notice_on_tags_notice_id_fkey" FOREIGN KEY ("notice_id") REFERENCES "system_notices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_notice_on_tags" ADD CONSTRAINT "system_notice_on_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "system_notice_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
