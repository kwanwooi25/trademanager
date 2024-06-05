import SearchInput from '@/components/SearchInput';
import { ComponentProps } from 'react';

export default function ProductListFilter({ onSearch, totalCount = 0 }: Props) {
  return (
    <div className="flex items-center justify-between">
      <SearchInput onSearch={onSearch} placeholder="상품명으로 검색" />
      <span className="text-sm">
        검색 결과: <span className="text-lg font-bold">{totalCount.toLocaleString()}</span>건
      </span>
    </div>
  );
}

type Props = {
  onSearch: ComponentProps<typeof SearchInput>['onSearch'];
  totalCount?: number;
};
