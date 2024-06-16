import { PurchaseOrderWithItems } from '@/types/purchaseOrder';
import { DEFAULT_PURCHASE_ORDER_ITEM_FORM_DATA } from './const';
import { PurchaseOrderFormSchema } from './formSchema';
import { format } from 'date-fns';

export function getDefaultFormValues(args?: Args): PurchaseOrderFormSchema {
  const { productOptionId, purchaseOrder } = args ?? {};

  if (!purchaseOrder) {
    return {
      orderedAt: new Date(),
      name: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      items: [
        {
          ...DEFAULT_PURCHASE_ORDER_ITEM_FORM_DATA,
          ...(productOptionId ? { productOptionId } : {}),
        },
      ],
    };
  }

  return {
    ...purchaseOrder,
    items: purchaseOrder.items.map((item) => ({
      ...item,
      receivedAt: item.receivedAt ?? undefined,
      receivedQuantity: item.receivedQuantity ?? 0,
    })),
  };
}

type Args = {
  productOptionId?: string | null;
  purchaseOrder?: PurchaseOrderWithItems;
};
