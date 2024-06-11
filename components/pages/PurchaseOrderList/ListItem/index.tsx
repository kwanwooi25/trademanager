'use client';

import ProductImage from '@/components/ProductImage';
import { createLabel } from '@/components/ProductOptionSelect/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE, PATHS } from '@/const/paths';
import { PURCHASE_ORDER_STATUS_LABEL_MAP } from '@/const/purchaseOrder';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PurchaseOrderListItem({ purchaseOrder }: Props) {
  const { id, orderedAt, status, productOption, orderedQuantity, receivedQuantity, receivedAt } =
    purchaseOrder;

  const { toast } = useToast();
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { handleAxiosError } = useAxiosError();

  const editPurchaseOrderUrl = `${PATHS.EDIT_PURCHASE_ORDER}/${id}?callbackUrl=${currentUrl}`;

  const handleClickDelete = async () => {
    try {
      await axios.delete(`${API_ROUTE.PURCHASE_ORDER}/${id}`);
      toast({
        description: '주문 삭제 성공',
        variant: 'success',
      });
      router.refresh();
    } catch (e) {
      handleAxiosError(e);
    }
  };

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

      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto" size="icon" variant="ghost">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={editPurchaseOrderUrl}>
                <Edit2 className="mr-2 h-4 w-4" />
                <span>수정</span>
              </Link>
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>삭제</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>주문 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              {createLabel(productOption)} {orderedQuantity.toLocaleString()}개 주문 내역을
              삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleClickDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}

type Props = {
  purchaseOrder: PurchaseOrderWithProductOption;
};
