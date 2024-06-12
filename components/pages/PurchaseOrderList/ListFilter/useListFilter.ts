'use client';

import { DEFAULT_PER } from '@/const/api';
import { GetPurchaseOrdersFilter } from '@/types/purchaseOrder';
import { useSearchParams } from 'next/navigation';

export function usePurchaseOrderListFilter() {
  const searchParams = useSearchParams();

  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';
  const status = (searchParams.get('status') ?? 'ALL') as GetPurchaseOrdersFilter['status'];
  const filter = { page, per, search, status } satisfies GetPurchaseOrdersFilter & {
    page: number;
    per: number;
  };

  return filter;
}
