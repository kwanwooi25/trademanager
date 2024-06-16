import { PurchaseOrderItem } from '@/prisma/generated/zod';
import { InventoryChange, PurchaseOrder } from '@prisma/client';
import { ProductOptionWithProduct } from './productOption';

export type PurchaseOrderWithItems = PurchaseOrder & {
  items: PurchaseOrderItemWithProductOption[];
};

export type PurchaseOrderItemWithProductOption = PurchaseOrderItem & {
  productOption: ProductOptionWithProduct;
  inventoryChange: InventoryChange;
};

export type GetPurchaseOrdersFilter = {
  search?: string;
};
