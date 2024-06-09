-- CreateEnum
CREATE TYPE "PurchaseOrderStatus" AS ENUM ('ORDERED', 'RECEIVED');

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "orderedQuantity" INTEGER NOT NULL DEFAULT 0,
    "orderedAt" TIMESTAMP(3) NOT NULL,
    "receivedQuantity" INTEGER DEFAULT 0,
    "receivedAt" TIMESTAMP(3),
    "status" "PurchaseOrderStatus" NOT NULL DEFAULT 'ORDERED',
    "productOptionId" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "ProductOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
