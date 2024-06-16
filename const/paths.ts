export const PATHS = {
  HOME: '/',
  REGISTER_COMPANY: '/company/register',
  PRODUCT_LIST: '/product',
  ADD_PRODUCT: '/product/add',
  EDIT_PRODUCT: '/product/edit',
  PURCHASE_ORDER_LIST: '/purchase-order',
  ADD_PURCHASE_ORDER: '/purchase-order/add',
  EDIT_PURCHASE_ORDER: '/purchase-order/edit',
  SALE_LIST: '/sales',
  ADD_SALE: '/sales/add',
  EDIT_SALE: '/sales/edit',
  SALES_CHANNEL_LIST: '/settings/sales-channel',
} as const;

export const API_ROUTE = {
  SIGN_IN: '/api/auth/signin',
  SIGN_OUT: '/api/auth/signout',
  REGISTER_COMPANY: '/api/company',
  PRODUCT: '/api/product',
  PRODUCT_OPTION: '/api/product/option',
  PURCHASE_ORDER: '/api/purchase-order',
  PURCHASE_ORDER_ITEM: '/api/purchase-order-item',
  SALES: '/api/sales',
  SALES_CHANNEL: '/api/sales-channel',
} as const;
