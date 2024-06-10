'use client';

import PurchaseOrderStatusSelect from '@/components/PurchaseOrderStatusSelect';
import SearchInput from '@/components/SearchInput';
import { GetPurchaseOrdersFilter } from '@/types/purchaseOrder';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
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

  const handlePurchaseOrderStatusChange: ComponentProps<
    typeof PurchaseOrderStatusSelect
  >['onChange'] = (status) => {
    handleFilterChange({ ...filter, status });
  };

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        search={filter.search}
        onSearch={handleSearch}
        placeholder="상품명/옵션명으로 검색"
      />
      <PurchaseOrderStatusSelect value={filter.status} onChange={handlePurchaseOrderStatusChange} />
    </div>
  );
}

type Props = {
  totalCount?: number;
};
