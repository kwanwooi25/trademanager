'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useSelectOptions } from '@/context/SelectOptions';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SuccessResponse } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { SalesChannel } from '@prisma/client';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SalesChannelFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function SalesChannelForm({ salesChannel, onSubmit }: Props) {
  const router = useRouter();
  const { handleAxiosError } = useAxiosError();
  const { toast } = useToast();
  const { salesChannels } = useSelectOptions();
  const form = useForm<SalesChannelFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ salesChannel }),
  });
  const { isSubmitting } = form.formState;

  const isEditing = !!salesChannel;
  const title = isEditing ? '판매 채널 수정' : '판매 채널 추가';

  const submitForm = form.handleSubmit(async (values: SalesChannelFormSchema) => {
    try {
      const method = isEditing ? 'patch' : 'post';
      const { data } = await axios<SuccessResponse<SalesChannel>>({
        method,
        url: API_ROUTE.SALES_CHANNEL,
        data: values,
      });
      toast({
        description: (
          <>
            {title} ({data.data.name}) 성공
          </>
        ),
        variant: 'success',
      });
      onSubmit?.();
      salesChannels.refetch();
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
          <div className="flex flex-col gap-4">
            <InputFormField control={form.control} name="name" label="판매 채널명" />
            <InputFormField control={form.control} name="url" label="판매처 URL" />
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
  salesChannel?: SalesChannel | null;
  onSubmit?: () => void;
};
