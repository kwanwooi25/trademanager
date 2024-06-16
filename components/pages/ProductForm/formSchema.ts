import { CountrySchema, ProductOptionStatusSchema } from '@/prisma/generated/zod';
import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: '상품명을 입력해주세요' }),
  code: z.string().optional(),
  purchaseAt: z.string().min(1, { message: '구매처를 입력해주세요' }),
  options: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, { message: '옵션명을 입력해주세요' }),
      imageFile: z
        .any()
        .refine((file) => file?.type.includes('image'), '이미지 파일만 업로드 가능합니다')
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
