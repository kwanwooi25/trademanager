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
import ProductOptionSelectItem from './SelectItem';
import { createLabel } from './utils';

export default function ProductOptionSelect({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { productOptions } = useSelectOptions();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="max-w-[190px] overflow-hidden justify-between my-2"
          variant={'outline'}
          role="combobox"
          aria-expanded={isOpen}
        >
          {value ? (
            <ProductOptionSelectItem
              productOption={productOptions.find(({ id }) => id === value)}
              isSelected
            />
          ) : (
            <span className="opacity-50">상품 옵션 선택</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Command>
          <CommandInput placeholder="상품명/옵션명으로 검색" />
          <CommandList>
            <CommandEmpty>표시할 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {productOptions.map((productOption) => {
                const { id } = productOption;
                const isSelected = value === productOption.id;

                return (
                  <CommandItem
                    className={cn(isSelected && 'bg-accent/70')}
                    key={id}
                    value={createLabel(productOption)}
                    onSelect={() => {
                      onChange(id);
                      setIsOpen(false);
                    }}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                    <ProductOptionSelectItem
                      productOption={productOption}
                      isSelected={isSelected}
                    />
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
  onChange: (productOptionId: string) => void;
};
