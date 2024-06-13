import { ReactNode } from 'react';

export type AlertProps = {
  title: ReactNode;
  description?: ReactNode;
  cancelLabel?: ReactNode;
  actionLabel?: ReactNode;
  action?: () => void | Promise<void>;
};

export type AlertContextState = {
  openAlert: (props: AlertProps) => void;
};
