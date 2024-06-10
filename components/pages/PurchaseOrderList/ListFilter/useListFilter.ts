'use client';

import { GetPurchaseOrdersFilter } from '@/types/purchaseOrder';
import { useSearchParams } from 'next/navigation';

export function usePurchaseOrderListFilter() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const status = (searchParams.get('status') ?? 'ALL') as GetPurchaseOrdersFilter['status'];
  const filter = { search, status } satisfies GetPurchaseOrdersFilter;

  return filter;
}
