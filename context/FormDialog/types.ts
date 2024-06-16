import PurchaseOrderForm from '@/components/forms/PurchaseOrderForm';
import ReceivePurchaseOrderForm from '@/components/forms/ReceivePurchaseOrderForm';
import SaleForm from '@/components/forms/SaleForm';
import SalesChannelForm from '@/components/forms/SalesChannelForm';
import StocktakingForm from '@/components/forms/StocktakingForm';
import { ComponentProps } from 'react';

export type FormDialogProps =
  | DefaultProps
  | PurchaseOrderFormProps
  | ReceivePurchaseOrderItemFormProps
  | SaleFormProps
  | SalesChannelFormProps
  | StocktakingFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type PurchaseOrderFormProps = {
  type: 'PURCHASE_ORDER';
  formProps: ComponentProps<typeof PurchaseOrderForm>;
};

type ReceivePurchaseOrderItemFormProps = {
  type: 'RECEIVE_PURCHASE_ORDER_ITEM';
  formProps: ComponentProps<typeof ReceivePurchaseOrderForm>;
};

type SaleFormProps = {
  type: 'SALE';
  formProps: ComponentProps<typeof SaleForm>;
};

type SalesChannelFormProps = {
  type: 'SALES_CHANNEL';
  formProps: ComponentProps<typeof SalesChannelForm>;
};

type StocktakingFormProps = {
  type: 'STOCKTAKING';
  formProps: ComponentProps<typeof StocktakingForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
