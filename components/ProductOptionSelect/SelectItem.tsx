import { cn } from '@/lib/utils';
import { ProductOptionWithProduct } from '@/types/productOption';
import Image from 'next/image';
import { createLabel } from './utils';

export default function ProductOptionSelectItem({ productOption, isSelected }: Props) {
  if (!productOption) return null;

  return (
    <div className={cn('flex items-center gap-2')}>
      <Image
        className="rounded-md"
        src={productOption.imageUrl ?? ''}
        alt={createLabel(productOption)}
        width={32}
        height={32}
      />
      <span className={cn(isSelected && 'font-bold')}>{createLabel(productOption)}</span>
    </div>
  );
}

type Props = {
  productOption?: ProductOptionWithProduct;
  isSelected?: boolean;
};
