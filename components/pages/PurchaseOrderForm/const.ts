import { PURCHASE_ORDER_STATUS_LABEL_MAP } from '@/const/purchaseOrder';
import { PurchaseOrderStatus } from '@prisma/client';

export const PURCHASE_ORDER_STATUS_SELECT_OPTIONS = Object.values(PurchaseOrderStatus).map(
  (status) => ({
    value: status,
    label: PURCHASE_ORDER_STATUS_LABEL_MAP[status],
  }),
);
