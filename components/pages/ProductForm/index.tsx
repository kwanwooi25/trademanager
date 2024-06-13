'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import ProductOptionForm from '@/components/pages/ProductForm/ProductOptionForm';
import { DEFAULT_PRODUCT_OPTION } from '@/components/pages/ProductForm/const';
import { formSchema, type ProductFormSchema } from '@/components/pages/ProductForm/formSchema';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE, PATHS } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { SuccessResponse } from '@/types/api';
import { ProductWithOptions } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@prisma/client';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { getDefaultFormValues } from './utils';

export default function ProductFormPage({ product }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getCallbackUrl = useCallbackUrl();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { openAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(product),
  });

  const isEditing = !!product;
  const title = isEditing ? '상품 수정' : '상품 등록';
  const callbackUrl = getCallbackUrl(searchParams.get('callbackUrl') ?? PATHS.PRODUCT_LIST);

  const onSubmit = async (values: ProductFormSchema) => {
    setIsLoading(true);

    try {
      const method = isEditing ? 'patch' : 'post';
      const { data } = await axios<SuccessResponse<Product>>({
        method,
        url: API_ROUTE.PRODUCT,
        data: values,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (isEditing) {
        toast({
          description: (
            <p>
              {title} 완료 (<b>{data.data.name}</b>)
            </p>
          ),
          variant: 'success',
        });
        router.replace(callbackUrl);
        return;
      }

      openAlert({
        title: `${title} 완료!`,
        description: (
          <>
            상품(<b>{data.data.name}</b>)을 등록했습니다.
            <br />
            계속해서 다른 상품을 등록하시겠습니까?
          </>
        ),
        cancelLabel: '목록으로 돌아가기',
        onCancel: () => router.replace(callbackUrl),
        actionLabel: '다른 상품 등록하기',
        action: () => form.reset(getDefaultFormValues()),
      });
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'options',
    keyName: 'fieldId',
  });

  const addOption = () => append({ ...DEFAULT_PRODUCT_OPTION });

  const handleRemove = (index: number) => {
    const optionIdsToDelete = form.getValues('optionIdsToDelete') ?? [];
    const optionId = fields[index].id;
    if (optionId) {
      form.setValue('optionIdsToDelete', [...optionIdsToDelete, optionId]);
    }

    if (fields.length <= 1) {
      update(index, { ...DEFAULT_PRODUCT_OPTION });
      return;
    }

    remove(index);
  };

  return (
    <Form {...form}>
      <form className="max-w-3xl mx-auto px-2 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <PageHeader title={title} backButton>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />}
            <span>{title}</span>
          </Button>
        </PageHeader>
        <PageBody className="flex flex-col gap-4">
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <InputFormField
              control={form.control}
              name="name"
              label="상품명"
              inputProps={{ autoFocus: true }}
            />
            <InputFormField control={form.control} name="code" label="상품코드" />
          </div>
          <InputFormField
            control={form.control}
            name="purchaseAt"
            label="구매처"
            inputProps={{ placeholder: 'URL 또는 명칭' }}
          />

          <div className={'pl-8 flex flex-col gap-4'}>
            <div className={'flex items-center justify-between'}>
              <h5 className={'text-lg'}>
                <b>옵션 </b>
                <span className={'text-sm'}>({fields.length.toLocaleString()}개)</span>
              </h5>
              <Button size={'sm'} variant={'secondary'} type={'button'} onClick={addOption}>
                옵션 추가
              </Button>
            </div>
            {fields.map(({ fieldId, ...option }, index) => (
              <ProductOptionForm
                key={fieldId}
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

type Props = {
  product?: ProductWithOptions | null;
};
