import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  COUNTRY_SELECT_OPTIONS,
  CURRENCY_SELECT_OPTIONS
} from '@/components/pages/AddProduct/const';
import { useFormContext } from 'react-hook-form';
import { LucideX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductOptionImageForm
  from '@/components/pages/AddProduct/ProductOptionImageForm';
import type {
  ProductFormSchema
} from '@/components/pages/AddProduct/formSchema';
import type { ComponentProps } from 'react';

export default function ProductOptionForm({
  index,
  option,
  onUpdate,
  onRemove
}: Props) {
  const form = useFormContext<ProductFormSchema>();
  
  const handleImageChange: ComponentProps<typeof ProductOptionImageForm>['onChange'] = ({ imageFile }) => {
    if (!imageFile) return;
    onUpdate(index, { ...option, imageFile });
  };
  
  const handleImageRemove: ComponentProps<typeof ProductOptionImageForm>['onRemove'] = () => {
    onUpdate(index, { ...option, imageFile: null });
  };
  
  return (
    <div
      className={'relative p-4 pt-8 border border-accent rounded-md gap-4 grid grid-cols-[auto_2fr_1fr]'}
    >
      <Button
        onClick={() => onRemove(index)}
        className={'absolute top-0 right-0'}
        variant={'ghost'}
        size={'icon'}
        type={'button'}
        tabIndex={-1}
      ><LucideX/></Button>
      <div className={'w-56 h-56'}>
        <ProductOptionImageForm
          imageFile={form.getValues('options')[index]?.imageFile}
          onChange={handleImageChange}
          onRemove={handleImageRemove}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <FormField
          control={form.control}
          name={`options.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>옵션명</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className={'flex gap-2'}>
          <FormField
            control={form.control}
            name={`options.${index}.currency`}
            render={({ field }) => (
              <FormItem className={'flex-1'}>
                <FormLabel>화폐</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={'Choose a currency'}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CURRENCY_SELECT_OPTIONS.map(({ value, label }) =>
                      <SelectItem
                        key={value}
                        value={value}
                      >
                        {label}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`options.${index}.unitPrice`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>단가</FormLabel>
                <FormControl>
                  <Input {...field} format={'numberOnly'}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={`options.${index}.importedFrom`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>수입국</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={'Choose a currency'}/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRY_SELECT_OPTIONS.map(({ value, label }) =>
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      {label}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <FormField
          control={form.control}
          name={`options.${index}.inventoryQuantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>수량</FormLabel>
              <FormControl>
                <Input {...field} format={'numberOnly'}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`options.${index}.leadtime`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>입고소요일</FormLabel>
              <FormControl>
                <Input {...field} format={'numberOnly'}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`options.${index}.location`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>보관 위치</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage/>
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
}