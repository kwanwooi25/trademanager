'use client';

import { AlertProvider } from '@/context/Alert';
import { FormDialogProvider } from '@/context/FormDialog';
import { SelectOptionsProvider } from '@/context/SelectOptions';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function Providers({ session, children }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SelectOptionsProvider>
          <FormDialogProvider>
            <AlertProvider>{children}</AlertProvider>
          </FormDialogProvider>
        </SelectOptionsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

type Props = PropsWithChildren & {
  session: Session | null;
};
