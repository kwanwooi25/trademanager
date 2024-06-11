'use client';

import ProductImage from '@/components/ProductImage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATHS } from '@/const/paths';
import { PURCHASE_ORDER_STATUS_LABEL_MAP } from '@/const/purchaseOrder';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import { format } from 'date-fns';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PurchaseOrderListItem({ purchaseOrder }: Props) {
  const { id, orderedAt, status, productOption, orderedQuantity, receivedQuantity, receivedAt } =
    purchaseOrder;

  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const handleClickEdit = () => {
    router.push(`${PATHS.EDIT_PURCHASE_ORDER}/${id}?callbackUrl=${currentUrl}`);
  };

  const handleClickDelete = () => {};

  return (
    <li className="px-4 py-2 grid items-center gap-4 grid-cols-[100px_70px_2fr_60px_1fr_100px_100px_100px__40px] border-b p-2">
      <span className="text-center">{format(orderedAt, 'yyyy-MM-dd')}</span>
      <span className="text-center">{PURCHASE_ORDER_STATUS_LABEL_MAP[status]}</span>
      <span>{productOption.product.name}</span>
      <ProductImage imageUrl={productOption.imageUrl ?? ''} size={60} />
      <span>{productOption.name}</span>
      <span className="text-center">{orderedQuantity.toLocaleString()}</span>
      <span className="text-center">
        {receivedQuantity ? receivedQuantity.toLocaleString() : '-'}
      </span>
      <span className="text-center">{receivedAt ? format(receivedAt, 'yyyy-MM-dd') : '-'}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-auto" size="icon" variant="ghost">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleClickEdit}>
            <Edit2 className="mr-2 h-4 w-4" />
            <span>수정</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={handleClickDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>삭제</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}

type Props = {
  purchaseOrder: PurchaseOrderWithProductOption;
};
