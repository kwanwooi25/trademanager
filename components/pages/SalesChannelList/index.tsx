'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import SalesChannelFormDialog from '@/components/forms/SalesChannelFormDialog';
import { getSalesChannels } from '@/services/salesChannel';
import SalesChannelListFilter from './ListFilter';
import { useSalesChannelListFilter } from './ListFilter/useListFilter';
import SalesChannelListHeader from './ListHeader';
import SalesChannelListItem from './ListItem';

export default function SalesChannelListPage({ salesChannels, lastPage }: Props) {
  const { page, search } = useSalesChannelListFilter();
  const isFilterEmpty = !search;

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="판매 채널 목록">
        <SalesChannelFormDialog />
      </PageHeader>

      <PageBody className={'flex flex-col gap-4'}>
        <SalesChannelListFilter />

        <ul className="flex flex-col">
          <SalesChannelListHeader />

          {!salesChannels.length && isFilterEmpty && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>등록된 판매 채널이 없습니다.</p>
              <p className="flex items-center gap-2">
                <SalesChannelFormDialog />
                <span>버튼을 눌러 판매 채널을 추가하세요.</span>
              </p>
            </div>
          )}

          {!salesChannels.length && !isFilterEmpty && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>검색된 판매 채널이 없습니다.</p>
            </div>
          )}

          {!!salesChannels.length && (
            <>
              {salesChannels.map((salesChannel) => (
                <SalesChannelListItem key={salesChannel.id} salesChannel={salesChannel} />
              ))}
              {lastPage > 1 && <Pagination currentPage={page} lastPage={lastPage} />}
            </>
          )}
        </ul>
      </PageBody>
    </div>
  );
}

type Props = Awaited<ReturnType<typeof getSalesChannels>>;
