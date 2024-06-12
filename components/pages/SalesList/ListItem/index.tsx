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
import { SaleWithProductOptionAndChannel } from '@/types/sale';
import { format } from 'date-fns';
import { Edit2, MoreVertical } from 'lucide-react';

export default function SalesListItem({ sale }: Props) {
  const { soldAt, productOption, quantity, channel } = sale;
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
          </DropdownMenuContent>
        </DropdownMenu>
      </SaleFormDialog>
    </li>
  );
}

type Props = {
  sale: SaleWithProductOptionAndChannel;
};
