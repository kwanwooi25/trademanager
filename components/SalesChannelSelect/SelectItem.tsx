import { cn } from '@/lib/utils';
import { SalesChannel } from '@prisma/client';

export default function SalesChannelSelectItem({ salesChannel, isSelected }: Props) {
  if (!salesChannel) return null;

  return (
    <div className={cn('flex items-center gap-2')}>
      <span className={cn(isSelected && 'font-bold')}>{salesChannel.name}</span>
    </div>
  );
}

type Props = {
  salesChannel?: SalesChannel;
  isSelected?: boolean;
};
