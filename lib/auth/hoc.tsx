import AuthRequired from '@/components/AuthRequired';
import CompanyRequired from '@/components/CompanyRequired';
import { auth } from '../auth';

export function withAuth(Component: () => JSX.Element | Promise<JSX.Element>) {
  return async function WithAuth() {
    const session = await auth();

    if (!session?.user) {
      return <AuthRequired />;
    } else if (!session?.user?.companyId) {
      return <CompanyRequired />;
    }

    return <Component />;
  };
}
