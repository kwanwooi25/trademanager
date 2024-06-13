import { useSelectOptions } from '@/context/SelectOptions';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import SalesChannelSelectItem from './SelectItem';

export default function SalesChannelSelect({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { salesChannels } = useSelectOptions();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-auto justify-between my-2"
          variant={'outline'}
          role="combobox"
          aria-expanded={isOpen}
        >
          {value ? (
            <SalesChannelSelectItem
              salesChannel={salesChannels.find(({ id }) => id === value)}
              isSelected
            />
          ) : (
            <span className="opacity-50">판매 채널 선택</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Command>
          <CommandInput placeholder="판매 채널명으로 검색" />
          <CommandList>
            <CommandEmpty>표시할 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {salesChannels.map((salesChannel) => {
                const { id, name } = salesChannel;
                const isSelected = value === id;

                return (
                  <CommandItem
                    className={cn(isSelected && 'bg-accent/70')}
                    key={id}
                    value={name}
                    onSelect={() => {
                      onChange(id);
                      setIsOpen(false);
                    }}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                    <SalesChannelSelectItem salesChannel={salesChannel} isSelected={isSelected} />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type Props = {
  value?: string;
  onChange: (salesChannelId: string) => void;
};
