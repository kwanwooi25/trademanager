import { PurchaseOrderStatus } from '@prisma/client';

export const PURCHASE_ORDER_STATUS_LABEL_MAP: Record<PurchaseOrderStatus, string> = {
  ORDERED: '주문 완료',
  RECEIVED: '입고 완료',
};
