'use client';

import ProductImage from '@/components/ProductImage';
import { createLabel } from '@/components/ProductOptionSelect/utils';
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
import { SaleWithProductOptionAndChannel } from '@/types/sale';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SalesListItem({ sale }: Props) {
  const router = useRouter();
  const { openAlert } = useAlert();
  const { handleAxiosError } = useAxiosError();
  const { toast } = useToast();
  const { openForm } = useFormDialog();

  const { id, soldAt, productOption, quantity, channel } = sale;

  const handleClickEdit = () => {
    openForm({
      type: 'SALE',
      formProps: {
        sales: [sale],
      },
    });
  };

  const handleClickDelete = () => {
    openAlert({
      title: '판매 내역 삭제',
      description: '판매 내역을 삭제하시겠습니까?',
      actionLabel: '삭제',
      action: async () => {
        try {
          await axios.delete(`${API_ROUTE.SALES}/${id}`);
          toast({
            description: '판매 내역 삭제 성공',
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
    <li className="px-4 py-2 grid items-center gap-4 grid-cols-[1fr_60px_4fr_1fr_1fr_40px] border-b p-2">
      <span className="text-center">{format(soldAt, 'yyyy-MM-dd')}</span>
      <ProductImage imageUrl={productOption.imageUrl ?? ''} size={60} />
      <div className="flex flex-col items-start">
        {/* {productOption.product.code && (
          <span className="font-bold text-sm opacity-50">{productOption.product.code}</span>
        )} */}
        <span className="line-clamp-1">{createLabel(productOption)}</span>
      </div>
      <span className="text-center">{quantity.toLocaleString()}</span>
      <span className="text-center">{channel.name}</span>

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
    </li>
  );
}

type Props = {
  sale: SaleWithProductOptionAndChannel;
};
