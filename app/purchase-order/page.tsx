import PurchaseOrderListPage from '@/components/pages/PurchaseOrderList';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(async () => {
  return <PurchaseOrderListPage />;
});
