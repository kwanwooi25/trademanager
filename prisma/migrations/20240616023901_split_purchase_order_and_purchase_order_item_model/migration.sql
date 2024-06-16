/*
  Warnings:

  - The values [CANCEL_STORAGE] on the enum `InventoryChangeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `purchaseOrderId` on the `InventoryChange` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryQuantity` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `leadtime` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `orderedQuantity` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `productOptionId` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `receivedAt` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `receivedQuantity` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PurchaseOrder` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InventoryChangeType_new" AS ENUM ('STORAGE', 'SALE', 'STOCKTAKING');
ALTER TABLE "InventoryChange" ALTER COLUMN "type" TYPE "InventoryChangeType_new" USING ("type"::text::"InventoryChangeType_new");
ALTER TYPE "InventoryChangeType" RENAME TO "InventoryChangeType_old";
ALTER TYPE "InventoryChangeType_new" RENAME TO "InventoryChangeType";
DROP TYPE "InventoryChangeType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "InventoryChange" DROP CONSTRAINT "InventoryChange_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_productOptionId_fkey";

-- AlterTable
ALTER TABLE "InventoryChange" DROP COLUMN "purchaseOrderId",
ADD COLUMN     "purchaseId" TEXT;

-- AlterTable
ALTER TABLE "ProductOption" DROP COLUMN "currency",
DROP COLUMN "inventoryQuantity",
DROP COLUMN "leadtime",
DROP COLUMN "location",
DROP COLUMN "unitPrice",
ADD COLUMN     "storageLocation" TEXT;

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "orderedQuantity",
DROP COLUMN "productOptionId",
DROP COLUMN "receivedAt",
DROP COLUMN "receivedQuantity",
DROP COLUMN "status",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

-- DropEnum
DROP TYPE "PurchaseOrderStatus";

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "id" TEXT NOT NULL,
    "orderedQuantity" INTEGER NOT NULL DEFAULT 0,
    "receivedAt" TIMESTAMP(3),
    "receivedQuantity" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,
    "productOptionId" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "ProductOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryChange" ADD CONSTRAINT "InventoryChange_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "PurchaseOrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
