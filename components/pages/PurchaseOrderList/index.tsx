'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { getPurchaseOrders } from '@/services/purchaseOrder';
import { GetPurchaseOrdersFilter } from '@/types/purchaseOrder';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentProps } from 'react';
import PurchaseOrderListFilter from './ListFilter';
import PurchaseOrderListHeader from './ListHeader';
import PurchaseOrderListItem from './ListItem';

export default function PurchaseOrderListPage({ purchaseOrders, lastPage, totalCount }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const page = +(searchParams.get('page') || 1);
  const search = searchParams.get('search') ?? undefined;
  const status = (searchParams.get('status') ?? 'ALL') as GetPurchaseOrdersFilter['status'];
  const filter = { search, status } satisfies GetPurchaseOrdersFilter;

  const isFilterEmpty = !!search && status === 'ALL';

  const currentUrl = `${pathname}?${searchParams.toString()}`;

  const addPurchaseOrderPath = `${PATHS.ADD_PURCHASE_ORDER}?${createQueryString(
    'callbackUrl',
    currentUrl,
  )}`;

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString('page', `${page}`)}`);
  };

  const handleFilterChange: ComponentProps<typeof PurchaseOrderListFilter>['onFilterChange'] = (
    filter,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filter).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="구매 목록">
        <Link href={addPurchaseOrderPath}>
          <Button>구매 입력</Button>
        </Link>
      </PageHeader>
      <PageBody className={'flex flex-col gap-4'}>
        {(!!purchaseOrders.length || !isFilterEmpty) && (
          <PurchaseOrderListFilter
            filter={filter}
            onFilterChange={handleFilterChange}
            totalCount={totalCount}
          />
        )}
        {!purchaseOrders.length && isFilterEmpty && (
          <div className="flex flex-col items-center py-16 gap-4">
            <p>등록된 구매 내역이 없습니다.</p>
            <p>
              <Link href={addPurchaseOrderPath}>
                <Button>구매 입력</Button>
              </Link>{' '}
              버튼을 눌러 구매 내역을 추가하세요.
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
            <ul className="flex flex-col">
              <PurchaseOrderListHeader />
              {purchaseOrders.map((purchaseOrder) => (
                <PurchaseOrderListItem key={purchaseOrder.id} purchaseOrder={purchaseOrder} />
              ))}
            </ul>
            {lastPage > 1 && (
              <Pagination currentPage={page} onChange={handlePageChange} lastPage={lastPage} />
            )}
          </>
        )}
      </PageBody>
    </div>
  );
}

type Props = Awaited<ReturnType<typeof getPurchaseOrders>>;
