/*
  Warnings:

  - A unique constraint covering the columns `[inventoryChangeId]` on the table `PurchaseOrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventoryChangeId` to the `PurchaseOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InventoryChange" DROP CONSTRAINT "InventoryChange_purchaseId_fkey";

-- AlterTable
ALTER TABLE "PurchaseOrderItem" ADD COLUMN     "inventoryChangeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrderItem_inventoryChangeId_key" ON "PurchaseOrderItem"("inventoryChangeId");

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_inventoryChangeId_fkey" FOREIGN KEY ("inventoryChangeId") REFERENCES "InventoryChange"("id") ON DELETE CASCADE ON UPDATE CASCADE;
