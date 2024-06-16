import { PurchaseOrderItemWithProductOption } from '@/types/purchaseOrder';
import { ReceivePurchaseOrderFormSchema } from './formSchema';

export function getDefaultFormValues({ purchaseOrderItem }: Args): ReceivePurchaseOrderFormSchema {
  return {
    ...purchaseOrderItem,
    receivedAt: purchaseOrderItem.receivedAt ?? new Date(),
    receivedQuantity: purchaseOrderItem.receivedQuantity ?? 0,
  };
}

type Args = {
  purchaseOrderItem: PurchaseOrderItemWithProductOption;
};
