'use client';

import ProductImage from '@/components/ProductImage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE, PATHS } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { isValidUrl } from '@/lib/string';
import { ProductWithOptions } from '@/types/product';
import axios from 'axios';
import { LucideEdit2, LucideExternalLink, LucideMoreVertical, LucideTrash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export default function ProductListItem({ product }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { handleAxiosError } = useAxiosError();
  const { purchasedAt, options } = product;
  const hasPurchaseUrl = isValidUrl(purchasedAt);

  const handleClickEdit = () => {
    router.push(`${PATHS.EDIT_PRODUCT}/${product.id}?callbackUrl=${currentUrl}`);
  };

  const handleClickDelete = (optionId: string) => async () => {
    try {
      await axios.delete(`${API_ROUTE.PRODUCT}/${product.id}/option/${optionId}`);
      toast({
        description: '상품 옵션 삭제 성공',
        variant: 'success',
      });
      router.refresh();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <li className="px-4 py-2 grid items-center gap-4 grid-cols-[2fr_auto_2fr_1fr_1fr_1fr_1fr_40px] border-b p-2">
      {options.map(
        (
          { id, imageUrl, name, currency, unitPrice, inventoryQuantity, leadtime, location },
          index,
        ) => (
          <Fragment key={id}>
            {index !== 0 ? (
              <span></span>
            ) : (
              <span className="text-lg font-bold">{product.name}</span>
            )}
            <ProductImage imageUrl={imageUrl} size={60} />
            <span className="text-base font-bold">{name}</span>
            <span className="text-right">
              {unitPrice ? (
                <>
                  <span className="text-xs opacity-60">{currency}</span>{' '}
                  <span>{unitPrice.toLocaleString()}</span>
                </>
              ) : (
                '-'
              )}
            </span>
            <span className="text-right">
              {inventoryQuantity ? inventoryQuantity.toLocaleString() : '-'}
            </span>
            <span className="text-right">{leadtime ? `${leadtime}일` : '-'}</span>
            <span className="text-right">{location ? location : '-'}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto" size="icon" variant="ghost">
                  <LucideMoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {product.name} / {name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleClickEdit}>
                  <LucideEdit2 className="mr-2 h-4 w-4" />
                  <span>상품 수정</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={handleClickDelete(id)}>
                  <LucideTrash2 className="mr-2 h-4 w-4" />
                  <span>옵션 삭제</span>
                </DropdownMenuItem>
                {hasPurchaseUrl && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={purchasedAt} target="_blank" rel="noopener noreferrer">
                        <LucideExternalLink className="mr-2 h-4 w-4" />
                        <span>구매처</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </Fragment>
        ),
      )}
    </li>
  );
}

type Props = {
  product: ProductWithOptions;
};
