import { ProductWithOptions } from '@/types/product';
import { ProductStatus } from '@prisma/client';
import { DEFAULT_PRODUCT_OPTION } from './const';
import { ProductFormSchema } from './formSchema';

export function getDefaultFormValues(product?: ProductWithOptions | null): ProductFormSchema {
  if (!product) {
    return {
      name: '',
      purchaseAt: '',
      status: ProductStatus.NONE,
      options: [{ ...DEFAULT_PRODUCT_OPTION }],
    };
  }

  const { options, nameForSale, searchTerms, detailPageUrl, ...rest } = product;

  return {
    nameForSale: nameForSale ?? undefined,
    searchTerms: searchTerms ?? undefined,
    detailPageUrl: detailPageUrl ?? undefined,
    ...rest,
    options: options.map(({ code, imageUrl, storageLocation, ...option }) => ({
      code: code ?? undefined,
      imageUrl: imageUrl ?? undefined,
      storageLocation: storageLocation ?? undefined,
      ...option,
    })),
    optionIdsToDelete: [],
  };
}
