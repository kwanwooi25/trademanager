import { Product } from '@prisma/client';
import { ProductOptionWithInventoryChangesAndSalesAndPurchases } from './productOption';

export type ProductWithOptions = Product & {
  options: ProductOptionWithInventoryChangesAndSalesAndPurchases[];
};

export type GetProductsFilter = {
  search?: string;
};
