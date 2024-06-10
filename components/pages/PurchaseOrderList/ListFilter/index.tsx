import PurchaseOrderStatusSelect from '@/components/PurchaseOrderStatusSelect';
import SearchInput from '@/components/SearchInput';
import { GetPurchaseOrdersFilter } from '@/types/purchaseOrder';
import { ComponentProps } from 'react';

export default function PurchaseOrderListFilter({ filter, onFilterChange, totalCount = 0 }: Props) {
  const handleSearch = (search: string) => {
    onFilterChange({ ...filter, search });
  };

  const handlePurchaseOrderStatusChange: ComponentProps<
    typeof PurchaseOrderStatusSelect
  >['onChange'] = (status) => {
    onFilterChange({ ...filter, status });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SearchInput
          search={filter.search}
          onSearch={handleSearch}
          placeholder="상품명/옵션명으로 검색"
        />
        <PurchaseOrderStatusSelect
          value={filter.status}
          onChange={handlePurchaseOrderStatusChange}
        />
      </div>
      <span className="text-sm">
        검색 결과: <span className="text-lg font-bold">{totalCount.toLocaleString()}</span>건
      </span>
    </div>
  );
}

type Props = {
  filter: GetPurchaseOrdersFilter;
  onFilterChange: (filter: GetPurchaseOrdersFilter) => void;
  totalCount?: number;
};
