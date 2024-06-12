import SalesChannelFormDialog from '@/components/forms/SalesChannelFormDialog';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SalesChannel } from '@prisma/client';
import { Edit2, MoreVertical } from 'lucide-react';
import Link from 'next/link';

export default function SalesChannelListItem({ salesChannel }: Props) {
  const { name, url } = salesChannel;

  return (
    <li className="px-4 py-6 grid items-center gap-4 grid-cols-[1fr_2fr_40px] text-sm font-semibold border-b p-2">
      <span className="pl-2 text-base">{name}</span>
      <span className="pl-2">
        {url && (
          <Link className="hover:underline" href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </Link>
        )}
      </span>

      <SalesChannelFormDialog salesChannel={salesChannel} customTrigger>
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
      </SalesChannelFormDialog>
    </li>
  );
}

type Props = {
  salesChannel: SalesChannel;
};
