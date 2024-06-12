import { Sale, SalesChannel } from '@prisma/client';
import { ProductOptionWithProduct } from './productOption';

export type SaleWithProductOptionAndChannel = Sale & {
  productOption: ProductOptionWithProduct;
  channel: SalesChannel;
};

export type GetSalesFilter = {
  search?: string;
};
