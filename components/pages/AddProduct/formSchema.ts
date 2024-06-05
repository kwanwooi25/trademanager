import { z } from 'zod';
import {
  CountrySchema,
  CurrencySchema,
  ProductOptionStatusSchema
} from '@/prisma/generated/zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: '상품명을 입력해주세요' }),
  purchasedAt: z.string().min(1, { message: '구매처를 입력해주세요' }),
  options: z.array(z.object({
    name: z.string().min(1, { message: '옵션명을 입력해주세요' }),
    imageFile: z.any().refine(file => file?.type.includes('image'), '이미지 파일만 업로드 가능합니다').optional().nullable(),
    imageUrl: z.string().url().optional(),
    unitPrice: z.string().transform((v) => +v).optional(),
    currency: CurrencySchema,
    importedFrom: CountrySchema,
    inventoryQuantity: z.string().transform((v) => +v).optional(),
    leadtime: z.string().transform((v) => +v).optional(),
    status: ProductOptionStatusSchema,
    location: z.string().optional(),
  })),
});

export type ProductFormSchema = z.infer<typeof formSchema>;