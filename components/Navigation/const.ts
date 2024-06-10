import { PATHS } from '@/const/paths';

export const NAV_LIST = [
  {
    href: PATHS.PRODUCT_LIST,
    label: '상품 관리',
    protected: true,
  },
  {
    href: PATHS.PURCHASE_ORDER_LIST,
    label: '구매 관리',
    protected: true,
  },
  {
    href: '/sales',
    label: '판매 관리',
    protected: true,
  },
  {
    href: '/settings',
    label: '설정',
    protected: true,
    submenus: [
      {
        href: '/account',
        label: '계정 설정',
        protected: true,
      },
      {
        href: '/company',
        label: '조직 설정',
        protected: true,
      },
    ],
  },
];
