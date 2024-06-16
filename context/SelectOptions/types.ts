import { ProductOptionWithProduct } from '@/types/productOption';
import { SalesChannel } from '@prisma/client';

export type SelectOptionsContextState = {
  productOptions: {
    value: ProductOptionWithProduct[];
    refetch: () => void | Promise<void>;
  };
  salesChannels: {
    value: SalesChannel[];
    refetch: () => void | Promise<void>;
  };
};
