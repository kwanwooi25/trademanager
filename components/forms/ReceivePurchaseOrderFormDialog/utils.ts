import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import { ReceivePurchaseOrderFormSchema } from './formSchema';

export function getDefaultFormValues({ purchaseOrder }: Args): ReceivePurchaseOrderFormSchema {
  return {
    ...purchaseOrder,
    receivedAt: purchaseOrder.receivedAt ?? new Date(),
    receivedQuantity: purchaseOrder.receivedQuantity ?? 0,
  };
}

type Args = {
  purchaseOrder: PurchaseOrderWithProductOption;
};
