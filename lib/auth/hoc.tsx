import AuthRequired from '@/components/AuthRequired';
import CompanyRequired from '@/components/CompanyRequired';
import { PATHS } from '@/const/paths';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ComponentType } from 'react';
import { auth } from '../auth';

export function withAuth(Component: ComponentType<any>) {
  return async function WithAuth(props: any) {
    const session = await auth();
    const headerList = headers();
    const pathname = headerList.get('x-pathname');

    if (!session?.user) return <AuthRequired />;

    if (!session?.user?.companyId) {
      if (pathname === PATHS.REGISTER_COMPANY) return <Component {...props} />;
      return <CompanyRequired />;
    }

    if (pathname === PATHS.REGISTER_COMPANY) return redirect(PATHS.HOME);

    return <Component {...props} />;
  };
}
