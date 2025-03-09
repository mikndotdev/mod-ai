/*
  Warnings:

  - You are about to drop the column `log_channel_id` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "log_channel_id",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "debuglog_channel_id" TEXT,
ADD COLUMN     "modlog_channel_id" TEXT;
