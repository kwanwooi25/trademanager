'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DEFAULT_PRODUCT_OPTION } from '@/components/pages/AddProduct/const';
import ProductOptionForm from '@/components/pages/AddProduct/ProductOptionForm';
import {
  formSchema,
  type ProductFormSchema
} from '@/components/pages/AddProduct/formSchema';

export default function AddProductPage() {
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      purchasedAt: '',
      options: [
        { ...DEFAULT_PRODUCT_OPTION }
      ],
    },
  });
  
  const onSubmit = async (values: ProductFormSchema) => {
    console.log(values);
  };
  
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'options'
  });
  
  const addOption = () => append({ ...DEFAULT_PRODUCT_OPTION });
  
  const handleRemove = (index: number) => {
    if (fields.length <= 1) {
      update(index, { ...DEFAULT_PRODUCT_OPTION });
      return;
    }
    
    remove(index);
  };
  
  return (
    <Form {...form}>
      <form
        className="max-w-3xl mx-auto px-2 py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <PageHeader
          title="상품 등록"
          backButton
        >
          <Button type="submit">상품 등록</Button>
        </PageHeader>
        <PageBody className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품명</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchasedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>구매처</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="URL 또는 명칭"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div className={'pl-8 flex flex-col gap-4'}>
            <div className={'flex items-center justify-between'}>
              <h5 className={'text-lg'}>
                <b>옵션 </b>
                <span className={'text-sm'}>({fields.length.toLocaleString()}개)</span>
              </h5>
              <Button
                size={'sm'}
                variant={'secondary'}
                type={'button'}
                onClick={addOption}
              >옵션 추가</Button>
            </div>
            {fields.map(({ id, ...option }, index) => (
              <ProductOptionForm
                key={id}
                index={index}
                option={option}
                onUpdate={update}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </PageBody>
      </form>
    </Form>
  );
}
