'use client';

import ProductOptionSelect from '@/components/ProductOptionSelect';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { API_ROUTE } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { cn } from '@/lib/utils';
import { SuccessResponse } from '@/types/api';
import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { DEFAULT_PURCHASE_ORDER_FORM_DATA } from './const';
import { PurchaseOrderFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function PurchaseOrderFormDialog({
  purchaseOrders = [],
  productOptionId,
  children,
  customTrigger,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const form = useForm<PurchaseOrderFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ productOptionId, purchaseOrders }),
  });
  const { isSubmitting } = form.formState;

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'purchaseOrders',
    keyName: 'fieldId',
  });

  const addPurchaseOrder = () => append({ ...DEFAULT_PURCHASE_ORDER_FORM_DATA });
  const removePurchaseOrder = (i: number) => () => {
    if (fields.length <= 1) {
      update(i, { ...DEFAULT_PURCHASE_ORDER_FORM_DATA });
      return;
    }
    remove(i);
  };

  const isEditing = !!purchaseOrders.length;
  const title = isEditing ? '주문 수정' : '주문 입력';

  const submitForm = form.handleSubmit(async (values: PurchaseOrderFormSchema) => {
    try {
      const method = isEditing ? 'patch' : 'post';
      const { data } = await axios<SuccessResponse<number>>({
        method,
        url: API_ROUTE.PURCHASE_ORDER,
        data: values.purchaseOrders,
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
      setIsOpen(false);
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Form {...form}>
        <form>
          {!customTrigger && (
            <DialogTrigger asChild>
              <Button>{title}</Button>
            </DialogTrigger>
          )}
          {children}
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 min-h-[50vh] max-h-[50vh] overflow-y-auto">
              {fields.map(({ fieldId }, index) => (
                <div key={fieldId} className="grid grid-cols-[1fr_140px_80px_40px] gap-4">
                  <FormField
                    control={form.control}
                    name={`purchaseOrders.${index}.productOptionId`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="h-[24px] flex items-center">상품 옵션</FormLabel>
                        <FormControl>
                          <ProductOptionSelect
                            value={field.value}
                            onChange={(productOptionId) =>
                              form.setValue(
                                `purchaseOrders.${index}.productOptionId`,
                                productOptionId,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DateFormField
                    control={form.control}
                    name={`purchaseOrders.${index}.orderedAt`}
                    label="주문일"
                  />
                  <InputFormField
                    control={form.control}
                    name={`purchaseOrders.${index}.orderedQuantity`}
                    label="주문수량"
                    inputProps={{ format: 'thousandSeparator' }}
                  />
                  <Button
                    className={cn('mt-[32px]', isEditing && 'hidden')}
                    onClick={removePurchaseOrder(index)}
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
                onClick={addPurchaseOrder}
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
    </Dialog>
  );
}

PurchaseOrderFormDialog.Trigger = DialogTrigger;

type Props = PropsWithChildren<{
  productOptionId?: string;
  purchaseOrders?: PurchaseOrderWithProductOption[];
  customTrigger?: boolean;
}>;
