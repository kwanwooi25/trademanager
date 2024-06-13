import { InventoryChange, Product, ProductOption, Sale } from '@prisma/client';

export type ProductOptionWithProduct = ProductOption & { product: Product };

export type ProductOptionWithInventoryChangesAndSales = ProductOption & {
  inventoryChanges: InventoryChange[];
  sales: Sale[];
};
