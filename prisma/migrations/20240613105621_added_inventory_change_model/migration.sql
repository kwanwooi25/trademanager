/*
  Warnings:

  - A unique constraint covering the columns `[inventoryChangeId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventoryChangeId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InventoryChangeType" AS ENUM ('STORAGE', 'CANCEL_STORAGE', 'SALE', 'STOCKTAKING');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "inventoryChangeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "InventoryChange" (
    "id" TEXT NOT NULL,
    "type" "InventoryChangeType" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "productOptionId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "purchaseOrderId" TEXT,
    "saleId" TEXT,

    CONSTRAINT "InventoryChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sale_inventoryChangeId_key" ON "Sale"("inventoryChangeId");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_inventoryChangeId_fkey" FOREIGN KEY ("inventoryChangeId") REFERENCES "InventoryChange"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryChange" ADD CONSTRAINT "InventoryChange_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "ProductOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryChange" ADD CONSTRAINT "InventoryChange_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryChange" ADD CONSTRAINT "InventoryChange_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
