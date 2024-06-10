/*
  Warnings:

  - Added the required column `companyId` to the `ProductOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductOption" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
