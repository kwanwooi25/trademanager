import { z } from 'zod';

export const formSchema = z.object({
  crn: z.string({ message: '사업자등록번호를 입력해주세요' }),
  name: z.string({ message: '사업자명을 입력해주세요' }),
  phone: z.string(),
  repName: z.string({ message: '대표자명을 입력해주세요' }),
  repMobile: z.string({ message: '대표자 휴대폰 번호를 입력해주세요' }),
});

export type CompanyFormSchema = z.infer<typeof formSchema>;
