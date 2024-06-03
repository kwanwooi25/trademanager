import AuthRequired from '@/components/AuthRequired';
import CompanyRequired from '@/components/CompanyRequired';
import { PATHS } from '@/const/paths';
import { headers } from 'next/headers';
import { auth } from '../auth';

export function withAuth(Component: () => JSX.Element | Promise<JSX.Element>) {
  return async function WithAuth() {
    const session = await auth();
    const headerList = headers();
    const pathname = headerList.get('x-pathname');

    if (!session?.user) {
      return <AuthRequired />;
    } else if (!session?.user?.companyId) {
      if (pathname === PATHS.REGISTER_COMPANY) return <Component />;
      return <CompanyRequired />;
    }

    return <Component />;
  };
}
