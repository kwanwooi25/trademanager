'use client';

import ProductImage from '@/components/ProductImage';
import { createLabel } from '@/components/ProductOptionSelect/utils';
import PurchaseOrderFormDialog from '@/components/forms/PurchaseOrderFormDialog';
import ReceivePurchaseOrderFormDialog from '@/components/forms/ReceivePurchaseOrderFormDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { PURCHASE_ORDER_STATUS_LABEL_MAP } from '@/const/purchaseOrder';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SuccessResponse } from '@/types/api';
import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit2, MoreVertical, PackageCheck, PackageX, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PurchaseOrderListItem({ purchaseOrder }: Props) {
  const { id, orderedAt, status, productOption, orderedQuantity, receivedQuantity, receivedAt } =
    purchaseOrder;
  const label = createLabel(productOption);

  const { toast } = useToast();
  const router = useRouter();
  const { handleAxiosError } = useAxiosError();
  const { openAlert } = useAlert();

  const handleClickCancelStore = () => {
    openAlert({
      title: '입고 취소',
      description: (
        <>
          <b>{label}</b> 입고 내역을 취소 처리하시겠습니까?
        </>
      ),
      actionLabel: '입고 취소',
      action: async () => {
        try {
          await axios.patch<SuccessResponse<number>>(
            `${API_ROUTE.PURCHASE_ORDER}/${id}/cancel-store`,
            purchaseOrder,
          );

          toast({
            description: <p>입고 취소 처리 ({label}) 완료</p>,
            variant: 'success',
          });

          router.refresh();
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  const handleClickDelete = () => {
    openAlert({
      title: '주문 삭제',
      description: (
        <>
          <b>{label}</b> 주문 내역을 삭제하시겠습니까?
        </>
      ),
      actionLabel: '주문 삭제',
      action: async () => {
        try {
          await axios.delete(`${API_ROUTE.PURCHASE_ORDER}/${id}`);
          toast({
            description: `주문 삭제 (${label}) 완료`,
            variant: 'success',
          });
          router.refresh();
          return true;
        } catch (e) {
          handleAxiosError(e);
          return false;
        }
      },
    });
  };

  return (
    <li className="px-4 py-2 grid items-center gap-4 grid-cols-[1fr_1fr_60px_4fr_1fr_1fr_1fr_40px] border-b">
      <span className="text-center">{format(orderedAt, 'yyyy-MM-dd')}</span>
      <span className="text-center">{PURCHASE_ORDER_STATUS_LABEL_MAP[status]}</span>
      <ProductImage imageUrl={productOption.imageUrl ?? ''} size={60} />
      <div className="flex flex-col items-start">
        {productOption.product.code && (
          <span className="font-bold text-sm opacity-50">{productOption.product.code}</span>
        )}
        <span className="line-clamp-1">{label}</span>
      </div>
      <span className="text-center">{orderedQuantity.toLocaleString()}</span>
      <span className="text-center">
        {receivedQuantity ? receivedQuantity.toLocaleString() : '-'}
      </span>
      <span className="text-center">{receivedAt ? format(receivedAt, 'yyyy-MM-dd') : '-'}</span>

      <PurchaseOrderFormDialog purchaseOrders={[purchaseOrder]} customTrigger>
        <ReceivePurchaseOrderFormDialog purchaseOrder={purchaseOrder} customTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto" size="icon" variant="ghost">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <PurchaseOrderFormDialog.Trigger asChild>
                <DropdownMenuItem>
                  <Edit2 className="mr-2 h-4 w-4" />
                  <span>수정</span>
                </DropdownMenuItem>
              </PurchaseOrderFormDialog.Trigger>
              {status === 'RECEIVED' && !!receivedAt && !!receivedQuantity ? (
                <DropdownMenuItem onClick={handleClickCancelStore}>
                  <PackageX className="mr-2 h-4 w-4" />
                  <span>입고 취소</span>
                </DropdownMenuItem>
              ) : (
                <ReceivePurchaseOrderFormDialog.Trigger asChild>
                  <DropdownMenuItem>
                    <PackageCheck className="mr-2 h-4 w-4" />
                    <span>입고 완료</span>
                  </DropdownMenuItem>
                </ReceivePurchaseOrderFormDialog.Trigger>
              )}
              <DropdownMenuItem onClick={handleClickDelete} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>삭제</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ReceivePurchaseOrderFormDialog>
      </PurchaseOrderFormDialog>
    </li>
  );
}

type Props = {
  purchaseOrder: PurchaseOrderWithProductOption;
};
