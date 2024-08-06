import { ProductStatus } from '@prisma/client';

export const PRODUCT_STATUS_TRANSLATIONS: Record<ProductStatus, string> = {
  NONE: '상품 수령전',
  IMAGES_READY: '이미지 준비 완료',
  DETAIL_PAGE_READY: '상세페이지 준비 완료',
  ON_SALE: '판매중',
  SUSPENDED: '판매중지',
} as const;
