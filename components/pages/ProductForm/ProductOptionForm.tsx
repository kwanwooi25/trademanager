import ProductOptionImageForm from '@/components/pages/ProductForm/ProductOptionImageForm';
import { COUNTRY_SELECT_OPTIONS } from '@/components/pages/ProductForm/const';
import type { ProductFormSchema } from '@/components/pages/ProductForm/formSchema';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputFormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LucideX } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProductOptionForm({ index, option, onUpdate, onRemove }: Props) {
  const form = useFormContext<ProductFormSchema>();

  const handleImageChange: ComponentProps<typeof ProductOptionImageForm>['onChange'] = ({
    imageFile,
  }) => {
    if (!imageFile) return;
    onUpdate(index, { ...option, imageFile });
  };

  const handleImageRemove: ComponentProps<typeof ProductOptionImageForm>['onRemove'] = () => {
    onUpdate(index, { ...option, imageFile: null, imageUrl: undefined });
  };

  return (
    <div
      className={
        'relative p-4 pt-8 border border-accent rounded-md gap-4 grid grid-cols-[auto_1fr]'
      }
    >
      <Button
        onClick={() => onRemove(index)}
        className={'absolute top-0 right-0'}
        variant={'ghost'}
        size={'icon'}
        type={'button'}
        tabIndex={-1}
      >
        <LucideX />
      </Button>
      <div className="w-[100px] h-[100px]">
        <ProductOptionImageForm
          imageFile={form.getValues('options')[index]?.imageFile}
          imageUrl={form.getValues('options')[index]?.imageUrl}
          onChange={handleImageChange}
          onRemove={handleImageRemove}
        />
      </div>
      <div className={'grid grid-cols-[1fr_1fr] gap-y-2 gap-x-4'}>
        <InputFormField
          control={form.control}
          name={`options.${index}.name`}
          label="옵션명"
          required
        />
        <InputFormField
          control={form.control}
          name={`options.${index}.code`}
          label="상품옵션코드"
        />
        <FormField
          control={form.control}
          name={`options.${index}.importedFrom`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>수입국</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={'수입국 선택'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRY_SELECT_OPTIONS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`options.${index}.storageLocation`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>보관 위치</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

type Props = {
  index: number;
  option: ProductFormSchema['options'][number];
  onUpdate: (index: number, option: ProductFormSchema['options'][number]) => void;
  onRemove: (index: number) => void;
};
