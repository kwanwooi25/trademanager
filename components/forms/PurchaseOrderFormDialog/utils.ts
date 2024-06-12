import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import { DEFAULT_PURCHASE_ORDER_FORM_DATA } from './const';
import { PurchaseOrderFormSchema } from './formSchema';

export function getDefaultFormValues(args?: Args): PurchaseOrderFormSchema {
  const { productOptionId, purchaseOrders = [] } = args ?? {};

  if (!purchaseOrders.length) {
    return {
      purchaseOrders: [
        { ...DEFAULT_PURCHASE_ORDER_FORM_DATA, ...(productOptionId ? { productOptionId } : {}) },
      ],
    };
  }

  return {
    purchaseOrders: purchaseOrders.map((purchaseOrder) => ({
      ...purchaseOrder,
      receivedAt: purchaseOrder.receivedAt ?? undefined,
      receivedQuantity: purchaseOrder.receivedQuantity ?? 0,
    })),
  };
}

type Args = {
  productOptionId?: string | null;
  purchaseOrders?: PurchaseOrderWithProductOption[];
};
