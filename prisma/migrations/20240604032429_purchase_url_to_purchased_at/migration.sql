/*
  Warnings:

  - You are about to drop the column `purchaseUrl` on the `Product` table. All the data in the column will be lost.
  - Added the required column `purchasedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "purchaseUrl",
ADD COLUMN     "purchasedAt" TEXT NOT NULL;
