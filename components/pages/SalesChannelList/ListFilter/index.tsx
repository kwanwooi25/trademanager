'use client';

import SearchInput from '@/components/SearchInput';
import { GetSalesChannelsFilter } from '@/types/salesChannel';
import { usePathname, useRouter } from 'next/navigation';
import { useSalesChannelListFilter } from './useListFilter';

export default function SalesChannelListFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const filter = useSalesChannelListFilter();

  const handleFilterChange = (filter: GetSalesChannelsFilter) => {
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
        placeholder="판매 채널명으로 검색"
      />
    </div>
  );
}
