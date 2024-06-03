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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  crn: z.string({ message: '사업자등록번호를 입력해주세요' }),
  name: z.string({ message: '사업자명을 입력해주세요' }),
  phone: z.string(),
  repName: z.string({ message: '대표자명을 입력해주세요' }),
  repMobile: z.string({ message: '대표자 휴대폰 번호를 입력해주세요' }),
});

export default function RegisterCompanyPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
