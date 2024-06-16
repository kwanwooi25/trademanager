import { PurchaseOrderFormSchema } from './formSchema';

export const DEFAULT_PURCHASE_ORDER_ITEM_FORM_DATA: PurchaseOrderFormSchema['items'][number] = {
  productOptionId: '',
  orderedQuantity: 0,
  receivedAt: undefined,
  receivedQuantity: 0,
};
