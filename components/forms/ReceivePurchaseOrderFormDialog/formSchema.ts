import { PurchaseOrderStatusSchema } from '@/prisma/generated/zod';
import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  receivedQuantity: z
    .union([z.string(), z.number()], { required_error: '입고 수량을 입력해주세요' })
    .transform((v) => +v),
  receivedAt: z.date({ required_error: '입고일을 선택해주세요' }),
  status: PurchaseOrderStatusSchema,
});

export type ReceivePurchaseOrderFormSchema = z.infer<typeof formSchema>;
