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
import { useSelectOptions } from '@/context/SelectOptions';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SalesChannel } from '@prisma/client';
import axios from 'axios';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SalesChannelListItem({ salesChannel }: Props) {
  const router = useRouter();
  const { openAlert } = useAlert();
  const { handleAxiosError } = useAxiosError();
  const { toast } = useToast();
  const { openForm } = useFormDialog();
  const { salesChannels } = useSelectOptions();

  const { id, name, url } = salesChannel;

  const handleClickEdit = () => {
    openForm({
      type: 'SALES_CHANNEL',
      formProps: {
        salesChannel,
      },
    });
  };

  const handleClickDelete = () => {
    openAlert({
      title: '판매 채널 삭제',
      description: (
        <>
          판매 채널을 삭제하면 해당 채널의 <b className="text-destructive">모든 판매 내역이 삭제</b>
          됩니다.
          <br />
          판매 채널(<b>{name}</b>)을 삭제하시겠습니까?
        </>
      ),
      actionLabel: '삭제',
      action: async () => {
        try {
          await axios.delete(`${API_ROUTE.SALES_CHANNEL}/${id}`);
          toast({
            description: (
              <>
                판매 채널 (<>{name}</>) 삭제 성공
              </>
            ),
            variant: 'success',
          });
          salesChannels.refetch();
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
    <li className="px-4 py-6 grid items-center gap-4 grid-cols-[1fr_2fr_40px] text-sm font-semibold border-b p-2">
      <span className="pl-2 text-base">{name}</span>
      <span className="pl-2">
        {url && (
          <Link className="hover:underline" href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </Link>
        )}
      </span>

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
  salesChannel: SalesChannel;
};
