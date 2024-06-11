import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import { PurchaseOrderStatus } from '@prisma/client';
import { PurchaseOrderFormSchema } from './formSchema';

export function getDefaultFormValues(args?: Args): PurchaseOrderFormSchema {
  const { productOptionId, purchaseOrder } = args ?? {};

  if (!purchaseOrder) {
    return {
      productOptionId: productOptionId ?? '',
      orderedAt: new Date(),
      orderedQuantity: 0,
      receivedAt: undefined,
      receivedQuantity: 0,
      status: PurchaseOrderStatus.ORDERED,
    };
  }

  return {
    ...purchaseOrder,
    receivedAt: purchaseOrder.receivedAt ?? undefined,
    receivedQuantity: purchaseOrder.receivedQuantity ?? 0,
  };
}

type Args = {
  productOptionId?: string | null;
  purchaseOrder?: PurchaseOrderWithProductOption | null;
};
