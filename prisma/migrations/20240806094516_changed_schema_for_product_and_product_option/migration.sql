/*
  Warnings:

  - You are about to drop the column `code` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('NONE', 'IMAGES_READY', 'DETAIL_PAGE_READY', 'ON_SALE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "code",
ADD COLUMN     "detailPageUrl" TEXT,
ADD COLUMN     "nameForSale" TEXT,
ADD COLUMN     "searchTerms" TEXT,
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'NONE';

-- AlterTable
ALTER TABLE "ProductOption" ADD COLUMN     "code" TEXT;
