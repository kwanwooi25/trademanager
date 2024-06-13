'use client';

import ProductImage from '@/components/ProductImage';
import SaleFormDialog from '@/components/forms/SaleFormDialog';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SaleWithProductOptionAndChannel } from '@/types/sale';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';

export default function SalesListItem({ sale }: Props) {
  const { openAlert } = useAlert();
  const { handleAxiosError } = useAxiosError();
  const { toast } = useToast();

  const { id, soldAt, productOption, quantity, channel } = sale;

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
        } catch (e) {
          handleAxiosError(e);
        }
      },
    });
  };

  return (
    <li className="px-4 py-2 grid items-center gap-4 grid-cols-[100px_2fr_60px_1fr_100px_100px_40px] border-b p-2">
      <span className="text-center">{format(soldAt, 'yyyy-MM-dd')}</span>
      <span>{productOption.product.name}</span>
      <ProductImage imageUrl={productOption.imageUrl ?? ''} size={60} />
      <span>{productOption.name}</span>
      <span className="text-center">{quantity.toLocaleString()}</span>
      <span className="text-center">{channel.name}</span>

      <SaleFormDialog sales={[sale]} customTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto" size="icon" variant="ghost">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Edit2 className="mr-2 h-4 w-4" />
                <span>수정</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem onClick={handleClickDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>삭제</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SaleFormDialog>
    </li>
  );
}

type Props = {
  sale: SaleWithProductOptionAndChannel;
};
