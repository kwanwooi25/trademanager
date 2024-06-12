import { z } from 'zod';

export const formSchema = z.object({
  sales: z.array(
    z.object({
      id: z.string().optional(),
      soldAt: z.date({ required_error: '판매일을 선택해주세요' }),
      quantity: z
        .union([z.string(), z.number()], { required_error: '판매 수량을 입력해주세요' })
        .transform((v) => +v),
      productOptionId: z.string().min(1, { message: '상품 옵션을 선택해주세요' }),
      channelId: z.string().min(1, { message: '판매채널을 선택해주세요' }),
    }),
  ),
});

export type SaleFormSchema = z.infer<typeof formSchema>;
