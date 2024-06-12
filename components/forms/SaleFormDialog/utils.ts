import { SaleWithProductOptionAndChannel } from '@/types/sale';
import { SaleFormSchema } from './formSchame';
import { DEFAULT_SALE_FORM_DATA } from './const';

export function getDefaultFormValues(args?: Args): SaleFormSchema {
  const { productOptionId, sales = [] } = args ?? {};

  if (!sales.length) {
    return {
      sales: [{ ...DEFAULT_SALE_FORM_DATA, ...(productOptionId ? { productOptionId } : {}) }],
    };
  }

  return {
    sales: sales.map((sale) => ({
      ...sale,
      soldAt: sale.soldAt ?? undefined,
      quantity: sale.quantity ?? 0,
    })),
  };
}

type Args = {
  productOptionId?: string | null;
  sales?: SaleWithProductOptionAndChannel[];
};
