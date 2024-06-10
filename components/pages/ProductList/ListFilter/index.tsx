'use client';

import SearchInput from '@/components/SearchInput';
import { GetProductsFilter } from '@/types/product';
import { usePathname, useRouter } from 'next/navigation';
import { useProductListFilter } from './useListFilter';

export default function ProductListFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const filter = useProductListFilter();

  const handleFilterChange = (filter: GetProductsFilter) => {
    const params = new URLSearchParams(filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (search: string) => {
    handleFilterChange({ ...filter, search });
  };

  return (
    <div className="flex items-center justify-between">
      <SearchInput search={filter.search} onSearch={handleSearch} placeholder="상품명으로 검색" />
    </div>
  );
}
