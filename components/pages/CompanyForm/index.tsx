'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="crn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사업자등록번호</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus format="companyRegistrationNumber" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사업자명</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사업자 전화번호</FormLabel>
                <FormControl>
                  <Input {...field} format="phoneNumber" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>대표자명</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repMobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>대표자 휴대폰 번호</FormLabel>
                <FormControl>
                  <Input {...field} format="phoneNumber" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4" type="submit">
            회사 등록
          </Button>
        </Form>
      </form>
    </PageBody>
  );
}
