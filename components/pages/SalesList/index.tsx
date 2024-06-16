'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { useFormDialog } from '@/context/FormDialog';
import { getSales } from '@/services/sales';
import SalesListFilter from './ListFilter';
import { useSalesListFilter } from './ListFilter/useListFilter';
import SalesListHeader from './ListHeader';
import SalesListItem from './ListItem';

export default function SalesListPage({ sales, lastPage }: Props) {
  const { page, search } = useSalesListFilter();
  const { openForm } = useFormDialog();

  const isFilterEmpty = !search;

  const handleClickAddSale = () => {
    openForm({
      type: 'SALE',
      formProps: {},
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="판매 목록">
        <Button onClick={handleClickAddSale}>판매 입력</Button>
      </PageHeader>

      <PageBody className={'flex flex-col gap-4'}>
        <SalesListFilter />

        <ul className="flex flex-col">
          <SalesListHeader />

          {!sales.length && isFilterEmpty && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>등록된 판매 내역이 없습니다.</p>
              <p className="flex items-center gap-2">
                <Button onClick={handleClickAddSale}>판매 입력</Button>
                <span>버튼을 눌러 판매 내역을 추가하세요.</span>
              </p>
            </div>
          )}

          {!sales.length && !isFilterEmpty && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>검색된 판매 내역이 없습니다.</p>
            </div>
          )}

          {!!sales.length && (
            <>
              {sales.map((sale) => (
                <SalesListItem key={sale.id} sale={sale} />
              ))}
              {lastPage > 1 && <Pagination currentPage={page} lastPage={lastPage} />}
            </>
          )}
        </ul>
      </PageBody>
    </div>
  );
}

type Props = Awaited<ReturnType<typeof getSales>>;
