import { Country, Currency, ProductOptionStatus } from '@prisma/client';
import type {
  ProductFormSchema
} from '@/components/pages/AddProduct/formSchema';

export const DEFAULT_PRODUCT_OPTION: ProductFormSchema['options'][number] = {
  imageFile: null,
  name: '',
  currency: Currency.CNY,
  importedFrom: Country.CN,
  status: ProductOptionStatus.ON_SALE,
  location: '',
};

export const CURRENCY_SELECT_OPTIONS = Object.values(Currency).map(currency => ({
  value: currency,
  label: currency
}));

export const COUNTRY_SELECT_OPTIONS = Object.values(Country).map(country => ({
  value: country,
  label: country
}));