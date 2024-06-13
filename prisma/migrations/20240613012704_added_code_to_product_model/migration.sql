/*
  Warnings:

  - You are about to drop the column `purchasedAt` on the `Product` table. All the data in the column will be lost.
  - Added the required column `purchaseAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "purchasedAt",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "purchaseAt" TEXT NOT NULL;
