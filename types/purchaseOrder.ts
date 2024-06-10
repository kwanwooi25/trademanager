import { PurchaseOrder, PurchaseOrderStatus } from '@prisma/client';
import { ProductOptionWithProduct } from './productOption';

export type PurchaseOrderWithProductOption = PurchaseOrder & {
  productOption: ProductOptionWithProduct;
};

export type GetPurchaseOrdersFilter = {
  search?: string;
  status: PurchaseOrderStatus | 'ALL';
};
