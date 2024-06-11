import PurchaseOrderFormPage from '@/components/pages/PurchaseOrderForm';
import { withAuth } from '@/lib/auth/hoc';
import { getPurchaseOrderById } from '@/services/purchaseOrder';

export default withAuth(async ({ params }: { params: { id: string } }) => {
  const purchaseOrder = await getPurchaseOrderById(params.id);

  return <PurchaseOrderFormPage purchaseOrder={purchaseOrder} />;
});
