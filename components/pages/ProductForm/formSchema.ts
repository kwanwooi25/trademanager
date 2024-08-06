import {
  CountrySchema,
  ProductOptionStatusSchema,
  ProductStatusSchema,
} from '@/prisma/generated/zod';
import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: '상품명을 입력해주세요' }),
  purchaseAt: z.string().min(1, { message: '구매처를 입력해주세요' }),
  detailPageUrl: z.string().url().optional(),
  nameForSale: z.string().optional(),
  searchTerms: z.string().optional(),
  status: ProductStatusSchema,
  options: z.array(
    z.object({
      id: z.string().optional(),
      code: z.string().optional(),
      name: z.string().min(1, { message: '옵션명을 입력해주세요' }),
      imageFile: z
        .any()
        .refine((file) => !file || file?.type.includes('image'), '이미지 파일만 업로드 가능합니다')
        .optional(),
      imageUrl: z.string().url().optional(),
      importedFrom: CountrySchema,
      status: ProductOptionStatusSchema,
      storageLocation: z.string().optional(),
    }),
  ),
  optionIdsToDelete: z.array(z.string()).optional(),
});

export type ProductFormSchema = z.infer<typeof formSchema>;
