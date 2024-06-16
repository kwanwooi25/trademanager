import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: '판매채널명을 입력해주세요' }),
  url: z.string().url({ message: '유효한 URL 형식으로 입력해주세요' }).optional(),
});

export type SalesChannelFormSchema = z.infer<typeof formSchema>;
