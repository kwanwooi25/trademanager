-- CreateEnum
CREATE TYPE "ProductOptionStatus" AS ENUM ('ON_SALE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('KRW', 'CNY', 'JPY');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('KR', 'CN', 'JP');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "unitPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" "Currency" NOT NULL DEFAULT 'CNY',
    "importedFrom" "Country" NOT NULL DEFAULT 'CN',
    "inventoryQuantity" INTEGER NOT NULL DEFAULT 0,
    "leadtime" INTEGER NOT NULL DEFAULT 21,
    "status" "ProductOptionStatus" NOT NULL DEFAULT 'ON_SALE',
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
