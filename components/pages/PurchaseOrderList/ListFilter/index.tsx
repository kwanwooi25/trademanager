'use client';

import SearchInput from '@/components/SearchInput';
import { GetPurchaseOrdersFilter } from '@/types/purchaseOrder';
import { usePathname, useRouter } from 'next/navigation';
import { usePurchaseOrderListFilter } from './useListFilter';

export default function PurchaseOrderListFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const filter = usePurchaseOrderListFilter();

  const handleFilterChange = (filter: GetPurchaseOrdersFilter) => {
    const params = new URLSearchParams(filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (search: string) => {
    handleFilterChange({ ...filter, search });
  };

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        search={filter.search}
        onSearch={handleSearch}
        placeholder="상품명/옵션명으로 검색"
      />
    </div>
  );
}
