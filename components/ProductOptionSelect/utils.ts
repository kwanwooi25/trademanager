import { ProductOptionWithProduct } from '@/types/productOption';

export function createLabel(productOption?: ProductOptionWithProduct) {
  if (!productOption) return '';

  const { name, product } = productOption;

  return `${product.name} / ${name}`;
}
