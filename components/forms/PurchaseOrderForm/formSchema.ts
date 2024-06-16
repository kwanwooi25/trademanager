import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  orderedAt: z.date({ required_error: '주문일을 선택해주세요' }),
  name: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string().optional(),
      orderedQuantity: z
        .union([z.string(), z.number()], { required_error: '주문 수량을 입력해주세요' })
        .transform((v) => +v),
      receivedAt: z.date().optional(),
      receivedQuantity: z
        .union([z.string(), z.number()])
        .transform((v) => +v)
        .optional(),
      productOptionId: z.string().min(1, { message: '상품 옵션을 선택해주세요' }),
    }),
  ),
});

export type PurchaseOrderFormSchema = z.infer<typeof formSchema>;
