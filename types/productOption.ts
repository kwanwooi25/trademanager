import {
  InventoryChange,
  Product,
  ProductOption,
  PurchaseOrder,
  PurchaseOrderItem,
  Sale,
} from '@prisma/client';

export type ProductOptionWithProduct = ProductOption & { product: Product };

export type ProductOptionWithInventoryChangesAndSalesAndPurchases = ProductOption & {
  inventoryChanges: InventoryChange[];
  sales: Sale[];
  purchases: (PurchaseOrderItem & { purchaseOrder: PurchaseOrder })[];
};
