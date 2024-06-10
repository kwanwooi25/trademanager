import { Product, ProductOption } from '@prisma/client';

export type ProductWithOptions = Product & { options: ProductOption[] };

export type GetProductsFilter = {
  search?: string;
};
