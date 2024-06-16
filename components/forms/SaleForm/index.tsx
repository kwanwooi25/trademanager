'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DateFormField, Form, InputFormField, SelectFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { cn } from '@/lib/utils';
import { SuccessResponse } from '@/types/api';
import { SaleWithProductOptionAndChannel } from '@/types/sale';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { DEFAULT_SALE_FORM_DATA } from './const';
import { SaleFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function SaleForm({ sales = [], productOptionId, onSubmit }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const form = useForm<SaleFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ productOptionId, sales }),
  });
  const { isSubmitting } = form.formState;

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'sales',
    keyName: 'fieldId',
  });

  const addSale = () => append({ ...DEFAULT_SALE_FORM_DATA });
  const removeSale = (i: number) => () => {
    if (fields.length <= 1) {
      update(i, { ...DEFAULT_SALE_FORM_DATA });
      return;
    }
    remove(i);
  };

  const isEditing = !!sales.length;
  const title = isEditing ? '판매 수정' : '판매 입력';

  const submitForm = form.handleSubmit(async (values: SaleFormSchema) => {
    try {
      const method = isEditing ? 'patch' : 'post';
      const { data } = await axios<SuccessResponse<number>>({
        method,
        url: API_ROUTE.SALES,
        data: values.sales,
      });

      toast({
        description: (
          <p>
            {title} ({data.data.toLocaleString()}개) 성공
          </p>
        ),
        variant: 'success',
      });
      router.refresh();
      onSubmit?.();
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 min-h-[50vh] max-h-[50vh] overflow-y-auto">
            {fields.map(({ fieldId }, index) => (
              <div key={fieldId} className="grid grid-cols-[1fr_140px_80px_1fr_40px] gap-4">
                <SelectFormField
                  control={form.control}
                  name={`sales.${index}.productOptionId`}
                  label="상품 옵션"
                  type="productOption"
                  onChange={(productOptionId) =>
                    form.setValue(`sales.${index}.productOptionId`, productOptionId)
                  }
                />
                <DateFormField
                  control={form.control}
                  name={`sales.${index}.soldAt`}
                  label="판매일"
                />
                <InputFormField
                  control={form.control}
                  name={`sales.${index}.quantity`}
                  label="판매수량"
                  inputProps={{ format: 'thousandSeparator' }}
                />
                <SelectFormField
                  control={form.control}
                  name={`sales.${index}.channelId`}
                  label="판매처"
                  type="salesChannel"
                  onChange={(channelId) => form.setValue(`sales.${index}.channelId`, channelId)}
                />
                <Button
                  className={cn('mt-[32px]', isEditing && 'hidden')}
                  onClick={removeSale(index)}
                  variant="ghost"
                  size="icon"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              className={cn('mr-auto', isEditing && 'hidden')}
              onClick={addSale}
              variant="outline"
            >
              <Plus />
              판매 추가
            </Button>
            <Button onClick={submitForm} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />}
              <span>저장</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  );
}

type Props = {
  productOptionId?: string;
  sales?: SaleWithProductOptionAndChannel[];
  onSubmit?: () => void;
};
