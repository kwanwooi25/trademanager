import { cn } from '@/lib/utils';
import { ProductOptionWithProduct } from '@/types/productOption';
import ProductImage from '../ProductImage';
import { createLabel } from './utils';

export default function ProductOptionSelectItem({ productOption, isSelected }: Props) {
  if (!productOption) return null;

  return (
    <div className={cn('flex items-center gap-2 overflow-hidden')}>
      <ProductImage className="rounded-md" imageUrl={productOption.imageUrl} size={32} />
      <span className={cn('text-ellipsis', isSelected && 'font-bold')}>
        {createLabel(productOption)}
      </span>
    </div>
  );
}

type Props = {
  productOption?: ProductOptionWithProduct;
  isSelected?: boolean;
};
