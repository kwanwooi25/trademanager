import { ProductOptionWithProduct } from '@/types/productOption';
import { SalesChannel } from '@prisma/client';

export type SelectOptionsContextState = {
  productOptions: ProductOptionWithProduct[];
  salesChannels: SalesChannel[];
};
