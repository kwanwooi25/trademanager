import { PURCHASE_ORDER_STATUS_LABEL_MAP } from '@/const/purchaseOrder';
import { PurchaseOrderStatus } from '@prisma/client';
import { PurchaseOrderFormSchema } from './formSchema';

export const PURCHASE_ORDER_STATUS_SELECT_OPTIONS = Object.values(PurchaseOrderStatus).map(
  (status) => ({
    value: status,
    label: PURCHASE_ORDER_STATUS_LABEL_MAP[status],
  }),
);

export const DEFAULT_PURCHASE_ORDER_FORM_DATA: PurchaseOrderFormSchema['purchaseOrders'][number] = {
  productOptionId: '',
  orderedAt: new Date(),
  orderedQuantity: 0,
  receivedAt: undefined,
  receivedQuantity: 0,
  status: PurchaseOrderStatus.ORDERED,
};
