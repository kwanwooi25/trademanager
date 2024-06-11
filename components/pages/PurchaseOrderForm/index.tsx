'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import ProductOptionSelect from '@/components/ProductOptionSelect';
import { createLabel } from '@/components/ProductOptionSelect/utils';
import { Button } from '@/components/ui/button';
import {
  DateFormField,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputFormField,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE, PATHS } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SuccessResponse } from '@/types/api';
import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PurchaseOrderFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function PurchaseOrderFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PurchaseOrderFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(),
  });

  const isEditing = false;
  const title = isEditing ? '구매 수정' : '구매 입력';
  const callbackUrl = searchParams.get('callbackUrl') ?? PATHS.PURCHASE_ORDER_LIST;

  const onSubmit = async (values: PurchaseOrderFormSchema) => {
    setIsLoading(true);

    try {
      const method = isEditing ? 'patch' : 'post';
      const { data } = await axios<SuccessResponse<PurchaseOrderWithProductOption>>({
        method,
        url: API_ROUTE.PURCHASE_ORDER,
        data: values,
      });

      const label = createLabel(data.data.productOption);

      toast({
        description: (
          <p>
            {title} ({label} {data.data.orderedQuantity}개) 성공
          </p>
        ),
        variant: 'success',
      });
      router.replace(callbackUrl);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="max-w-2xl mx-auto px-2 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <PageHeader title="구매 입력" backButton>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />}
            <span>구매 입력</span>
          </Button>
        </PageHeader>
        <PageBody className="grid grid-cols-[1fr_160px_100px] items-center gap-4">
          <FormField
            control={form.control}
            name="productOptionId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="h-[24px] flex items-center">상품 옵션</FormLabel>
                <FormControl>
                  <ProductOptionSelect
                    value={field.value}
                    onChange={(productOptionId) =>
                      form.setValue('productOptionId', productOptionId)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DateFormField control={form.control} name="orderedAt" label="주문일" />
          <InputFormField
            control={form.control}
            name="orderedQuantity"
            label="주문수량"
            inputProps={{ format: 'thousandSeparator' }}
          />
        </PageBody>
      </form>
    </Form>
  );
}
