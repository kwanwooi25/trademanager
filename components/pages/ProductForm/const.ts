import type { ProductFormSchema } from '@/components/pages/ProductForm/formSchema';
import { Country, ProductOptionStatus } from '@prisma/client';

export const DEFAULT_PRODUCT_OPTION: ProductFormSchema['options'][number] = {
  imageFile: null,
  name: '',
  importedFrom: Country.CN,
  status: ProductOptionStatus.ON_SALE,
  storageLocation: '',
};

export const COUNTRY_SELECT_OPTIONS = Object.values(Country).map((country) => ({
  value: country,
  label: country,
}));
