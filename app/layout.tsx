import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import Providers from './providers';
import MainLayout from '@/components/layouts/MainLayout';

const notoSans = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trade Manager',
  description: 'Trade Manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(notoSans.className, 'min-h-screen flex flex-col antialiased')}>
        <Providers>
          <NextTopLoader color="gray" zIndex={99999} />
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
