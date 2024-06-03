import AuthRequired from '@/components/AuthRequired';
import { auth } from '../auth';

export function withAuth(Component: () => JSX.Element | Promise<JSX.Element>) {
  return async function WithAuth() {
    const session = await auth();

    if (!session?.user) {
      return <AuthRequired />;
    }

    return <Component />;
  };
}
