export const PATHS = {
  HOME: '/',
  REGISTER_COMPANY: '/company/register',
  PRODUCT_LIST: '/product',
  ADD_PRODUCT: '/product/add',
  EDIT_PRODUCT: '/product/edit',
} as const;

export const API_ROUTE = {
  SIGN_IN: '/api/auth/signin',
  SIGN_OUT: '/api/auth/signout',
  REGISTER_COMPANY: '/api/company',
  PRODUCT: '/api/product',
  DELETE_PRODUCT_OPTION: '/api/product/option',
} as const;
