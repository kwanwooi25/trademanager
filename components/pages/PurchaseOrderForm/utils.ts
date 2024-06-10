import { PurchaseOrder, PurchaseOrderStatus } from '@prisma/client';
import { PurchaseOrderFormSchema } from './formSchema';

export function getDefaultFormValues(args?: Args): PurchaseOrderFormSchema {
  const { productOptionId = '', purchaseOrder } = args ?? {};

  if (!purchaseOrder) {
    return {
      productOptionId,
      orderedAt: new Date(),
      orderedQuantity: 0,
      receivedAt: undefined,
      receivedQuantity: 0,
      status: PurchaseOrderStatus.ORDERED,
    };
  }

  return {
    productOptionId,
    orderedAt: new Date(),
    orderedQuantity: 0,
    receivedAt: undefined,
    receivedQuantity: 0,
    status: PurchaseOrderStatus.ORDERED,
  };
}

type Args = {
  productOptionId?: string;
  purchaseOrder?: PurchaseOrder;
};
