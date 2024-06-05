import { cn } from '@/lib/utils';
import Image from 'next/image';

const DEFAULT_IMAGE_URL = '/default_product_image.png';
const DEFAULT_IMAGE_SIZE = 224;

export default function ProductImage({ className, imageUrl, size = DEFAULT_IMAGE_SIZE }: Props) {
  const src = imageUrl ?? DEFAULT_IMAGE_URL;

  return (
    <div className="flex items-center" style={{ width: size, height: size }}>
      <Image
        className={cn('w-full h-full', className)}
        src={src}
        alt={src}
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

type Props = {
  className?: string;
  imageUrl?: string | null;
  size?: number;
};
