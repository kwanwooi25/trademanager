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
import { useAlert } from '@/context/Alert';
import { useFormDialog } from '@/context/FormDialog';
import { useSelectOptions } from '@/context/SelectOptions';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { isValidUrl } from '@/lib/string';
import { ProductWithOptions } from '@/types/product';
import { ProductOption } from '@prisma/client';
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { Edit2, ExternalLink, MoreVertical, PackageOpen, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export default function ProductListItem({ product }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { handleAxiosError } = useAxiosError();
  const { openAlert } = useAlert();
  const { openForm } = useFormDialog();
  const { productOptions } = useSelectOptions();

  const editProductUrl = `${PATHS.EDIT_PRODUCT}/${product.id}?callbackUrl=${currentUrl}`;

  const handleClickStocktaing = (productOptionId: string) => () => {
    openForm({
      type: 'STOCKTAKING',
      formProps: {
        productOptionId,
      },
    });
  };

  const handleClickDelete = (option: ProductOption) => () => {
    openAlert({
      title: '옵션 삭제',
      description: (
        <>
          상품 옵션을 삭제하면 해당 옵션의{' '}
          <b className="text-destructive">모든 구매/판매 내역이 삭제</b>됩니다.
          <br />
          상품 옵션 (
          <b>
            {product.name} / {option.name}
          </b>
          ) 을 삭제하시겠습니까?
        </>
      ),
      actionLabel: '삭제',
      action: async () => {
        try {
          await axios.delete(`${API_ROUTE.PRODUCT}/${product.id}/option/${option.id}`);
          toast({
            description: '상품 옵션 삭제 성공',
            variant: 'success',
          });
          productOptions.refetch();
          router.refresh();
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  const { purchaseAt, options } = product;
  const hasPurchaseUrl = isValidUrl(purchaseAt);

  return (
    <li className="px-4 py-2 grid items-center gap-4 grid-cols-[3fr_auto_2fr_1fr_1fr_1fr_1fr_1fr_40px] border-b">
      {options.map((option, index) => {
        const { id, imageUrl, name, inventoryChanges, sales } = option;

        const inventoryQuantity = inventoryChanges.reduce(
          (sum, inventoryChange) => sum + inventoryChange.quantity,
          0,
        );
        const recentSalesQuantity = sales.reduce((sum, sale) => {
          const difference = differenceInDays(new Date(), sale.soldAt);
          if (difference > 30) return sum;
          return sum + sale.quantity;
        }, 0);

        return (
          <Fragment key={id}>
            {index === 0 && (
              <div
                className="self-start text-base font-bold"
                style={{ gridRow: `span ${options.length}` }}
              >
                <span className="line-clamp-1">{product.name}</span>
              </div>
            )}
            <ProductImage imageUrl={imageUrl} size={60} />
            <span className="text-base font-bold">
              {option.code && <span className="font-bold text-sm opacity-50">{option.code}</span>}
              <span className="line-clamp-1">{name}</span>
            </span>
            <span className="text-right">-</span>
            <span className="text-right">
              {inventoryQuantity ? inventoryQuantity.toLocaleString() : '-'}
            </span>
            <span className="text-right">
              {recentSalesQuantity ? recentSalesQuantity.toLocaleString() : '-'}
            </span>
            <span className="text-right">-</span>
            <span className="text-right">-</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto" size="icon" variant="ghost">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {product.name} / {name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={editProductUrl}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    <span>상품 수정</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleClickStocktaing(id)}>
                  <PackageOpen className="mr-2 h-4 w-4" />
                  <span>재고 수량 조정</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleClickDelete(option)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>옵션 삭제</span>
                </DropdownMenuItem>

                {hasPurchaseUrl && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={purchaseAt} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span>구매처</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </Fragment>
        );
      })}
    </li>
  );
}

type Props = {
  product: ProductWithOptions;
};
