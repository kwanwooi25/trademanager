import { ProductWithOptions } from '@/types/product';
import { DEFAULT_PRODUCT_OPTION } from './const';
import { ProductFormSchema } from './formSchema';

export function getDefaultFormValues(product?: ProductWithOptions | null): ProductFormSchema {
  if (!product) {
    return {
      name: '',
      purchaseAt: '',
      options: [{ ...DEFAULT_PRODUCT_OPTION }],
    };
  }

  const { options, code, ...rest } = product;

  return {
    code: code ?? undefined,
    ...rest,
    options: options.map(({ imageUrl, location, ...option }) => ({
      imageUrl: imageUrl ?? undefined,
      location: location ?? undefined,
      ...option,
    })),
    optionIdsToDelete: [],
  };
}
