import { PurchaseOrder } from '@prisma/client';
import { ProductOptionWithProduct } from './productOption';

export type PurchaseOrderWithProductOption = PurchaseOrder & {
  productOption: ProductOptionWithProduct;
};
