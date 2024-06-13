import { Product } from '@prisma/client';
import { ProductOptionWithInventoryChangesAndSales } from './productOption';

export type ProductWithOptions = Product & { options: ProductOptionWithInventoryChangesAndSales[] };

export type GetProductsFilter = {
  search?: string;
};
