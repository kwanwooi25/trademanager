import PurchaseOrderListPage from '@/components/pages/PurchaseOrderList';
import { DEFAULT_PER } from '@/const/api';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { getUrl } from '@/lib/url';
import { getPurchaseOrders } from '@/services/purchaseOrder';
import { redirect } from 'next/navigation';

export default withAuth(async () => {
  const { searchParams } = getUrl();
  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';

  const res = await getPurchaseOrders({ page, per, search });

  if (page > 1 && !res.purchaseOrders.length) {
    return redirect(PATHS.PURCHASE_ORDER_LIST);
  }

  return <PurchaseOrderListPage {...res} />;
});
