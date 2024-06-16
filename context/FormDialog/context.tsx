import PurchaseOrderForm from '@/components/forms/PurchaseOrderForm';
import ReceivePurchaseOrderForm from '@/components/forms/ReceivePurchaseOrderForm';
import SaleForm from '@/components/forms/SaleForm';
import SalesChannelForm from '@/components/forms/SalesChannelForm';
import StocktakingForm from '@/components/forms/StocktakingForm';
import { Dialog } from '@/components/ui/dialog';
import { PropsWithChildren, createContext, useCallback, useState } from 'react';
import { DEFAULT_FORM_DIALOG_PROPS } from './const';
import { FormDialogContextState, FormDialogProps } from './types';

export const FormDialogContext = createContext<FormDialogContextState | null>(null);

export function FormDialogProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [formDialogProps, setFormDialogProps] = useState<FormDialogProps>({
    ...DEFAULT_FORM_DIALOG_PROPS,
  });

  const handleOpenChange = (open: boolean, props?: FormDialogProps) => {
    setIsOpen(open);
    setFormDialogProps({ ...DEFAULT_FORM_DIALOG_PROPS, ...props });
  };

  const openForm = useCallback((props: FormDialogProps) => {
    handleOpenChange(true, {
      ...DEFAULT_FORM_DIALOG_PROPS,
      ...props,
      // @ts-ignore
      formProps: {
        ...props.formProps,
        onSubmit: () => {
          props.formProps?.onSubmit?.();
          handleOpenChange(false);
        },
      },
    });
  }, []);

  return (
    <FormDialogContext.Provider value={{ openForm }}>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {children}

        {formDialogProps.type === 'PURCHASE_ORDER' && (
          <PurchaseOrderForm {...formDialogProps.formProps} />
        )}

        {formDialogProps.type === 'RECEIVE_PURCHASE_ORDER_ITEM' && (
          <ReceivePurchaseOrderForm {...formDialogProps.formProps} />
        )}

        {formDialogProps.type === 'SALE' && <SaleForm {...formDialogProps.formProps} />}

        {formDialogProps.type === 'SALES_CHANNEL' && (
          <SalesChannelForm {...formDialogProps.formProps} />
        )}

        {formDialogProps.type === 'STOCKTAKING' && (
          <StocktakingForm {...formDialogProps.formProps} />
        )}
      </Dialog>
    </FormDialogContext.Provider>
  );
}
