'use client';

import { DEFAULT_PER } from '@/const/api';
import { GetSalesChannelsFilter } from '@/types/salesChannel';
import { useSearchParams } from 'next/navigation';

export function useSalesChannelListFilter() {
  const searchParams = useSearchParams();

  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';
  const filter = { page, per, search } satisfies GetSalesChannelsFilter & {
    page: number;
    per: number;
  };

  return filter;
}
