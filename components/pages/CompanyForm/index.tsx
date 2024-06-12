'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SuccessResponse } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CompanyFormSchema, formSchema } from './formSchema';

export default function CompanyFormPage() {
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const router = useRouter();
  const session = useSession();
  const form = useForm<CompanyFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: CompanyFormSchema) => {
    try {
      const { data } = await axios.post<SuccessResponse<Company>>(
        API_ROUTE.REGISTER_COMPANY,
        values,
      );
      toast({
        description: (
          <p>
            회사 등록 성공 (<b>{data.data.name}</b>)
          </p>
        ),
        variant: 'success',
      });
      await session.update();
      router.refresh();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <PageBody className="w-full max-w-md mx-auto flex flex-col gap-4">
      <PageHeader title="회사 등록" />
      <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormField
            control={form.control}
            name="crn"
            label="사업자등록번호"
            inputProps={{ autoFocus: true, format: 'companyRegistrationNumber' }}
          />
          <InputFormField control={form.control} name="name" label="사업자명" />
          <InputFormField
            control={form.control}
            name="phone"
            label="사업자 전화번호"
            inputProps={{ format: 'phoneNumber' }}
          />
          <InputFormField control={form.control} name="repName" label="대표자명" />
          <InputFormField
            control={form.control}
            name="repMobile"
            label="대표자 휴대폰 번호"
            inputProps={{ format: 'phoneNumber' }}
          />

          <Button className="mt-4" type="submit">
            회사 등록
          </Button>
        </form>
      </Form>
    </PageBody>
  );
}
