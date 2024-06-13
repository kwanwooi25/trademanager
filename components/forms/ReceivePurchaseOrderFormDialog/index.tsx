'use client';

import { createLabel } from '@/components/ProductOptionSelect/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DateFormField, Form, FormItem, FormLabel, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { cn } from '@/lib/utils';
import { SuccessResponse } from '@/types/api';
import { PurchaseOrderWithProductOption } from '@/types/purchaseOrder';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReceivePurchaseOrderFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function ReceivePurchaseOrderFormDialog({
  purchaseOrder,
  children,
  customTrigger,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const form = useForm<ReceivePurchaseOrderFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ purchaseOrder }),
  });
  const { isSubmitting } = form.formState;

  const title = '입고 완료 처리';
  const { productOption } = purchaseOrder;
  const label = createLabel(productOption);

  const submitForm = form.handleSubmit(async (values: ReceivePurchaseOrderFormSchema) => {
    try {
      await axios.patch<SuccessResponse<number>>(`${API_ROUTE.PURCHASE_ORDER}/${values.id}/store`, {
        ...purchaseOrder,
        ...values,
      });

      toast({
        description: (
          <p>
            {title} ({label}) 완료
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

            <div className="grid grid-cols-[1fr_140px_80px] gap-4">
              <FormItem className="flex flex-col">
                <FormLabel className="h-[24px] flex items-center">상품 옵션</FormLabel>

                <Button
                  className="overflow-hidden justify-between my-2"
                  variant={'outline'}
                  type="button"
                >
                  <div className={cn('flex items-center gap-2 overflow-hidden')}>
                    <Image
                      className="rounded-md"
                      src={productOption.imageUrl ?? ''}
                      alt={label}
                      width={32}
                      height={32}
                    />
                    <span className="font-bold">{label}</span>
                  </div>
                </Button>
              </FormItem>

              <DateFormField control={form.control} name="receivedAt" label="입고일" />
              <InputFormField
                control={form.control}
                name="receivedQuantity"
                label="입고수량"
                inputProps={{ format: 'thousandSeparator' }}
              />
            </div>

            <DialogFooter>
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

ReceivePurchaseOrderFormDialog.Trigger = DialogTrigger;

type Props = PropsWithChildren<{
  purchaseOrder: PurchaseOrderWithProductOption;
  customTrigger?: boolean;
}>;
