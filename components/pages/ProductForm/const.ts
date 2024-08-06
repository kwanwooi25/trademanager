import type { ProductFormSchema } from '@/components/pages/ProductForm/formSchema';
import { PRODUCT_STATUS_TRANSLATIONS } from '@/const/options';
import { Country, ProductOptionStatus, ProductStatus } from '@prisma/client';

export const DEFAULT_PRODUCT_OPTION: ProductFormSchema['options'][number] = {
  imageFile: null,
  name: '',
  code: '',
  importedFrom: Country.CN,
  status: ProductOptionStatus.ON_SALE,
  storageLocation: '',
};

export const PRODUCT_STATUS_OPTIONS = Object.values(ProductStatus).map((status) => ({
  value: status,
  label: PRODUCT_STATUS_TRANSLATIONS[status],
}));

export const COUNTRY_SELECT_OPTIONS = Object.values(Country).map((country) => ({
  value: country,
  label: country,
}));
