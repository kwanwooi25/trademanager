/*
  Warnings:

  - You are about to drop the column `mobile` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "mobile",
ALTER COLUMN "registeredAt" DROP NOT NULL,
ALTER COLUMN "certificateUrl" DROP NOT NULL;
