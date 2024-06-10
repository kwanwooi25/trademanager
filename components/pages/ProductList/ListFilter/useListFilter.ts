'use client';

import { GetProductsFilter } from '@/types/product';
import { useSearchParams } from 'next/navigation';

export function useProductListFilter() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const filter = { search } satisfies GetProductsFilter;

  return filter;
}
