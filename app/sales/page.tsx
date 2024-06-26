import SalesListPage from '@/components/pages/SalesList';
import { DEFAULT_PER } from '@/const/api';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { getUrl } from '@/lib/url';
import { getSales } from '@/services/sales';
import { redirect } from 'next/navigation';

export default withAuth(async () => {
  const { searchParams } = getUrl();
  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';

  const res = await getSales({
    page,
    per,
    search,
  });

  if (page > 1 && !res.sales.length) {
    return redirect(PATHS.SALE_LIST);
  }

  return <SalesListPage {...res} />;
});
