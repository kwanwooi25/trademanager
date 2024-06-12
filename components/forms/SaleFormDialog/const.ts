import { SaleFormSchema } from './formSchame';

export const DEFAULT_SALE_FORM_DATA: SaleFormSchema['sales'][number] = {
  productOptionId: '',
  channelId: '',
  quantity: 0,
  soldAt: new Date(),
};
