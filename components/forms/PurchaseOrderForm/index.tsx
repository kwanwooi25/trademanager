'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Divider from '@/components/ui/divider';
import { DateFormField, Form, InputFormField, SelectFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { cn } from '@/lib/utils';
import { SuccessResponse } from '@/types/api';
import { PurchaseOrderWithItems } from '@/types/purchaseOrder';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { DEFAULT_PURCHASE_ORDER_ITEM_FORM_DATA } from './const';
import { PurchaseOrderFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function PurchaseOrderForm({ purchaseOrder, productOptionId, onSubmit }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const form = useForm<PurchaseOrderFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ productOptionId, purchaseOrder }),
  });
  const { isSubmitting } = form.formState;

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'items',
    keyName: 'fieldId',
  });

  const addPurchaseOrderItem = () => append({ ...DEFAULT_PURCHASE_ORDER_ITEM_FORM_DATA });
  const removePurchaseOrderItem = (i: number) => () => {
    if (fields.length <= 1) {
      update(i, { ...DEFAULT_PURCHASE_ORDER_ITEM_FORM_DATA });
      return;
    }
    remove(i);
  };

  const isEditing = !!purchaseOrder;
  const title = isEditing ? '주문 수정' : '주문 입력';

  const submitForm = form.handleSubmit(async (values: PurchaseOrderFormSchema) => {
    try {
      const method = isEditing ? 'patch' : 'post';
      await axios<SuccessResponse<null>>({
        method,
        url: API_ROUTE.PURCHASE_ORDER,
        data: values,
      });

      toast({
        description: <p>{title} 성공</p>,
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 min-h-[50vh] max-h-[50vh] overflow-y-auto py-2 px-1">
            <div className="grid grid-cols-[1fr_2fr] gap-4">
              <DateFormField control={form.control} name="orderedAt" label="주문일" />
              <InputFormField
                control={form.control}
                name="name"
                label="주문명"
                inputProps={{ autoFocus: true }}
              />
            </div>

            <Divider />

            {fields.map(({ fieldId }, index) => (
              <div key={fieldId} className="pl-2 grid grid-cols-[3fr_1fr_40px] gap-4">
                <SelectFormField
                  control={form.control}
                  name={`items.${index}.productOptionId`}
                  label="상품 옵션"
                  type="productOption"
                  onChange={(productOptionId) =>
                    form.setValue(`items.${index}.productOptionId`, productOptionId)
                  }
                />
                <InputFormField
                  control={form.control}
                  name={`items.${index}.orderedQuantity`}
                  label="주문수량"
                  inputProps={{ format: 'thousandSeparator' }}
                />
                <Button
                  className={cn('mt-[32px]', isEditing && 'hidden')}
                  onClick={removePurchaseOrderItem(index)}
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
              onClick={addPurchaseOrderItem}
              variant="outline"
            >
              <Plus />
              주문 추가
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
  purchaseOrder?: PurchaseOrderWithItems;
  onSubmit?: () => void;
};
