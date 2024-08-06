import { ProductStatus } from '@prisma/client';

export const PRODUCT_STATUS_TRANSLATIONS: Record<ProductStatus, string> = {
  NONE: '상품 수령전',
  IMAGES_READY: '이미지 준비 완료',
  DETAIL_PAGE_READY: '상세페이지 준비 완료',
  ON_SALE: '판매중',
  SUSPENDED: '판매중지',
} as const;

export const PRODUCT_STATUS_COLORS: Record<ProductStatus, { bg: string; text: string }> = {
  NONE: { bg: '#71717a', text: '#f4f4f5' },
  IMAGES_READY: { bg: '#eab308', text: '#fef9c3' },
  DETAIL_PAGE_READY: { bg: '#16a34a', text: '#dcfce7' },
  ON_SALE: { bg: '#4f46e5', text: '#e0e7ff' },
  SUSPENDED: { bg: '#18181b', text: '#f4f4f5' },
} as const;
