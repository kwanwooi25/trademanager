export const NAV_LIST = [
  {
    href: '/product',
    label: '상품 관리',
    protected: true,
  },
  {
    href: '/purchase',
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
