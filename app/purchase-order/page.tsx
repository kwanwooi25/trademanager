import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import PurchaseOrderListFilter from '@/components/pages/PurchaseOrderList/ListFilter';
import PurchaseOrderListHeader from '@/components/pages/PurchaseOrderList/ListHeader';
import PurchaseOrderListItem from '@/components/pages/PurchaseOrderList/ListItem';
import { Button } from '@/components/ui/button';
import { DEFAULT_PER } from '@/const/api';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { getCurrentUrl, getUrl } from '@/lib/url';
import { getPurchaseOrders } from '@/services/purchaseOrder';
import { GetPurchaseOrdersFilter } from '@/types/purchaseOrder';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default withAuth(async () => {
  const { searchParams } = getUrl();
  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';
  const status = (searchParams.get('status') ?? 'ALL') as GetPurchaseOrdersFilter['status'];

  const currentUrl = getCurrentUrl();
  const addPurchaseOrderPath = `${PATHS.ADD_PURCHASE_ORDER}?callbackUrl=${currentUrl}`;

  const isFilterEmpty = !search && status === 'ALL';

  const { purchaseOrders, lastPage } = await getPurchaseOrders({
    page,
    per,
    search,
    status,
  });

  if (page > 1 && !purchaseOrders.length) {
    return redirect(PATHS.PURCHASE_ORDER_LIST);
  }

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="구매 목록">
        <Link href={addPurchaseOrderPath}>
          <Button>주문 입력</Button>
        </Link>
      </PageHeader>

      <PageBody className={'flex flex-col gap-4'}>
        <PurchaseOrderListFilter />

        <ul className="flex flex-col">
          <PurchaseOrderListHeader />

          {!purchaseOrders.length && isFilterEmpty && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>등록된 구매 내역이 없습니다.</p>
              <p className="flex items-center gap-2">
                <Link href={addPurchaseOrderPath}>
                  <Button>주문 입력</Button>
                </Link>
                <span>버튼을 눌러 구매 내역을 추가하세요.</span>
              </p>
            </div>
          )}

          {!purchaseOrders.length && !isFilterEmpty && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>검색된 구매 내역이 없습니다.</p>
            </div>
          )}

          {!!purchaseOrders.length && (
            <>
              {purchaseOrders.map((purchaseOrder) => (
                <PurchaseOrderListItem key={purchaseOrder.id} purchaseOrder={purchaseOrder} />
              ))}
              {lastPage > 1 && <Pagination currentPage={page} lastPage={lastPage} />}
            </>
          )}
        </ul>
      </PageBody>
    </div>
  );
});
