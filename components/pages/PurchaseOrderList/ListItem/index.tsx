'use client';

import ProductImage from '@/components/ProductImage';
import { createLabel } from '@/components/ProductOptionSelect/utils';
import PurchaseOrderFormDialog from '@/components/forms/PurchaseOrderFormDialog';
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
import { API_ROUTE } from '@/const/paths';
import { PURCHASE_ORDER_STATUS_LABEL_MAP } from '@/const/purchaseOrder';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SuccessResponse } from '@/types/api';
import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit2, MoreVertical, PackageCheck, PackageX, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentProps, ReactNode, useState } from 'react';

const DEFAULT_ALERT_DIALOG_CONETNT: {
  title: ReactNode;
  description: ReactNode;
  actionLabel: ReactNode;
  action: ComponentProps<typeof AlertDialogAction>['onClick'];
} = {
  title: '',
  description: '',
  actionLabel: '',
  action: () => {},
};

export default function PurchaseOrderListItem({ purchaseOrder }: Props) {
  const { id, orderedAt, status, productOption, orderedQuantity, receivedQuantity, receivedAt } =
    purchaseOrder;

  const { toast } = useToast();
  const router = useRouter();
  const { handleAxiosError } = useAxiosError();

  const [alertDialogContent, setAlertDialogContent] = useState({ ...DEFAULT_ALERT_DIALOG_CONETNT });
  const [purchaseOrderFormDialogMode, setPurchaseOrderFormDialogMode] =
    useState<ComponentProps<typeof PurchaseOrderFormDialog>['mode']>('EDIT_ORDERS');

  const setOrderAsOrdered = async () => {
    try {
      await axios.patch<SuccessResponse<number>>(API_ROUTE.PURCHASE_ORDER, [
        {
          ...purchaseOrder,
          status: 'ORDERED',
          receivedAt: null,
          receivedQuantity: 0,
        },
      ]);
      const label = createLabel(purchaseOrder.productOption);

      toast({
        description: <p>{label} 입고 취소 처리 성공</p>,
        variant: 'success',
      });

      router.refresh();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const deletePurchaseOrder = async () => {
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

      <PurchaseOrderFormDialog
        mode={purchaseOrderFormDialogMode}
        purchaseOrders={[purchaseOrder]}
        customTrigger
      >
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto" size="icon" variant="ghost">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <PurchaseOrderFormDialog.Trigger asChild>
                <DropdownMenuItem onClick={() => setPurchaseOrderFormDialogMode('EDIT_ORDERS')}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  <span>수정</span>
                </DropdownMenuItem>
              </PurchaseOrderFormDialog.Trigger>
              {status === 'RECEIVED' && !!receivedAt && !!receivedQuantity ? (
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() =>
                      setAlertDialogContent({
                        title: '입고 취소',
                        description: (
                          <>
                            <b>{createLabel(productOption)}</b> 입고 내역을 취소 처리하시겠습니까?
                          </>
                        ),
                        actionLabel: '입고 취소',
                        action: setOrderAsOrdered,
                      })
                    }
                  >
                    <PackageX className="mr-2 h-4 w-4" />
                    <span>입고 취소</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              ) : (
                <PurchaseOrderFormDialog.Trigger asChild>
                  <DropdownMenuItem
                    onClick={() => setPurchaseOrderFormDialogMode('RECEIVE_ORDERS')}
                  >
                    <PackageCheck className="mr-2 h-4 w-4" />
                    <span>입고 완료</span>
                  </DropdownMenuItem>
                </PurchaseOrderFormDialog.Trigger>
              )}
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() =>
                    setAlertDialogContent({
                      title: '주문 삭제',
                      description: (
                        <>
                          <b>{createLabel(productOption)}</b> 주문 내역을 삭제하시겠습니까?
                        </>
                      ),
                      actionLabel: '주문 삭제',
                      action: deletePurchaseOrder,
                    })
                  }
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>삭제</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertDialogContent.title}</AlertDialogTitle>
              <AlertDialogDescription>{alertDialogContent.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={alertDialogContent.action}>
                {alertDialogContent.actionLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PurchaseOrderFormDialog>
    </li>
  );
}

type Props = {
  purchaseOrder: PurchaseOrderWithProductOption;
};
