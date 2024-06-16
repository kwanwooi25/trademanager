import { z } from 'zod';

export const formSchema = z.object({
  quantity: z
    .union([z.string(), z.number()], { required_error: '재고 조정 수량을 입력해주세요' })
    .transform((v) => +v),
});

export type StocktakingFormSchema = z.infer<typeof formSchema>;
