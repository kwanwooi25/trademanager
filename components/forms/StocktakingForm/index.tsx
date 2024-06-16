'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SuccessResponse } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { InventoryChange } from '@prisma/client';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { StocktakingFormSchema, formSchema } from './formSchema';

export default function StocktakingForm({ productOptionId, onSubmit }: Props) {
  const router = useRouter();
  const { handleAxiosError } = useAxiosError();
  const { toast } = useToast();
  const form = useForm<StocktakingFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { quantity: 0 },
  });
  const { isSubmitting } = form.formState;

  const title = '재고 수량 조정';

  const submitForm = form.handleSubmit(async (values: StocktakingFormSchema) => {
    try {
      await axios.post<SuccessResponse<InventoryChange>>(
        `${API_ROUTE.PRODUCT_OPTION}/${productOptionId}/inventory`,
        values,
      );

      toast({
        title: `${title} 완료`,
        variant: 'success',
      });
      onSubmit?.();
      router.refresh();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-2">
            <InputFormField
              control={form.control}
              name="quantity"
              label="재고 조정 수량"
              inputProps={{ type: 'number', format: 'numberOnly' }}
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
  );
}

type Props = {
  productOptionId: string;
  onSubmit?: () => void;
};
