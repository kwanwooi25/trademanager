'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import PurchaseOrderFormDialog from '@/components/forms/PurchaseOrderFormDialog';
import { getPurchaseOrders } from '@/services/purchaseOrder';
import PurchaseOrderListFilter from './ListFilter';
import { usePurchaseOrderListFilter } from './ListFilter/useListFilter';
import PurchaseOrderListHeader from './ListHeader';
import PurchaseOrderListItem from './ListItem';

export default function PurchaseOrderListPage({ purchaseOrders, lastPage }: Props) {
  const { page, search, status } = usePurchaseOrderListFilter();

  const isFilterEmpty = !search && status === 'ALL';

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="구매 목록">
        <PurchaseOrderFormDialog />
      </PageHeader>

      <PageBody className={'flex flex-col gap-4'}>
        <PurchaseOrderListFilter />

        <ul className="flex flex-col">
          <PurchaseOrderListHeader />

          {!purchaseOrders.length && isFilterEmpty && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>등록된 구매 내역이 없습니다.</p>
              <p className="flex items-center gap-2">
                <PurchaseOrderFormDialog />
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
}

type Props = Awaited<ReturnType<typeof getPurchaseOrders>>;
