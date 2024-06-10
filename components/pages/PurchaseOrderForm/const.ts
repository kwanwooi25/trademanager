import { PurchaseOrderStatus } from '@prisma/client';

const PURCHASE_ORDER_STATUS_LABEL_MAP: Record<PurchaseOrderStatus, string> = {
  ORDERED: '주문 완료',
  RECEIVED: '입고 완료',
};

export const PURCHASE_ORDER_STATUS_SELECT_OPTIONS = Object.values(PurchaseOrderStatus).map(
  (status) => ({
    value: status,
    label: PURCHASE_ORDER_STATUS_LABEL_MAP[status],
  }),
);
