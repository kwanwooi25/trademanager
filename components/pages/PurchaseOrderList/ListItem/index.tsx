'use client';

import ProductImage from '@/components/ProductImage';
import { createLabel } from '@/components/ProductOptionSelect/utils';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useFormDialog } from '@/context/FormDialog';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SuccessResponse } from '@/types/api';
import { PurchaseOrderWithItems } from '@/types/purchaseOrder';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit2, MoreVertical, PackageCheck, PackageX, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PurchaseOrderListItem({ purchaseOrder }: Props) {
  const { orderedAt, name, items } = purchaseOrder;

  const { toast } = useToast();
  const router = useRouter();
  const { handleAxiosError } = useAxiosError();
  const { openAlert } = useAlert();
  const { openForm } = useFormDialog();

  const handleClickEdit = () => {
    openForm({
      type: 'PURCHASE_ORDER',
      formProps: {
        purchaseOrder,
      },
    });
  };

  const handleClickStore = (purchaseOrderItem: PurchaseOrderWithItems['items'][number]) => () => {
    openForm({
      type: 'RECEIVE_PURCHASE_ORDER_ITEM',
      formProps: {
        purchaseOrderItem,
      },
    });
  };

  const handleClickCancelStore =
    (purchaseOrderItem: PurchaseOrderWithItems['items'][number]) => () => {
      const label = createLabel(purchaseOrderItem.productOption);

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
              `${API_ROUTE.PURCHASE_ORDER_ITEM}/${purchaseOrderItem.id}/cancel-store`,
              purchaseOrderItem,
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
          <b>{name}</b> 주문 내역을 삭제하시겠습니까?
        </>
      ),
      actionLabel: '주문 삭제',
      action: async () => {
        try {
          await axios.delete(`${API_ROUTE.PURCHASE_ORDER}/${purchaseOrder.id}`);
          toast({
            description: `주문 삭제 (${name}) 완료`,
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
    <AccordionItem value={purchaseOrder.id} className="px-4 py-2 border-b">
      <AccordionTrigger className="grid items-center gap-4 grid-cols-[1fr_1fr_60px_4fr_1fr_1fr_1fr_40px_16px]">
        <span className="text-center">{format(orderedAt, 'yyyy-MM-dd')}</span>
        <span className="text-left col-span-6">{name}</span>
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
            <DropdownMenuItem onClick={handleClickDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>삭제</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </AccordionTrigger>
      {items.map((item) => {
        const { id, productOption, orderedQuantity, receivedAt, receivedQuantity } = item;
        const label = createLabel(productOption);

        return (
          <AccordionContent
            key={id}
            className="grid items-center gap-4 grid-cols-[1fr_1fr_60px_4fr_1fr_1fr_1fr_40px_16px]"
          >
            <span></span>
            <span></span>
            <ProductImage imageUrl={productOption.imageUrl ?? ''} size={60} />
            <div className="flex flex-col items-start">
              {/* {productOption.product.code && (
                <span className="font-bold text-sm opacity-50">{productOption.product.code}</span>
              )} */}
              <span className="line-clamp-1">{label}</span>
            </div>
            <span className="text-center">{orderedQuantity.toLocaleString()}</span>
            <span className="text-center">
              {receivedQuantity ? receivedQuantity.toLocaleString() : '-'}
            </span>
            <span className="text-center">
              {receivedAt ? format(receivedAt, 'yyyy-MM-dd') : '-'}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto" size="icon" variant="ghost">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!!receivedAt && !!receivedQuantity ? (
                  <DropdownMenuItem onClick={handleClickCancelStore(item)}>
                    <PackageX className="mr-2 h-4 w-4" />
                    <span>입고 취소</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handleClickStore(item)}>
                    <PackageCheck className="mr-2 h-4 w-4" />
                    <span>입고 완료</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </AccordionContent>
        );
      })}
    </AccordionItem>
  );
}

type Props = {
  purchaseOrder: PurchaseOrderWithItems;
};
