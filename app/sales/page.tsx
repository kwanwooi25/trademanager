import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { DEFAULT_PER } from '@/const/api';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { getCurrentUrl, getUrl } from '@/lib/url';
import { Sale } from '@prisma/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default withAuth(async () => {
  const { searchParams } = getUrl();
  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';

  const currentUrl = getCurrentUrl();
  const addSalePath = `${PATHS.ADD_SALE}?callbackUrl=${currentUrl}`;

  const isFilterEmpty = !search;

  // TODO: fetch sales
  const sales: Sale[] = [];
  const lastPage = 1;
  // const { purchaseOrders, lastPage } = await getPurchaseOrders({
  //   page,
  //   per,
  //   search,
  // });

  if (page > 1 && !sales.length) {
    return redirect(PATHS.SALE_LIST);
  }

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="판매 목록">
        <Link href={addSalePath}>
          <Button>판매 입력</Button>
        </Link>
      </PageHeader>

      <PageBody className={'flex flex-col gap-4'}>
        {/* TODO: ListFilter */}

        <ul className="flex flex-col">
          {/* TODO: ListHeader */}

          {!sales.length && isFilterEmpty && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>등록된 판매 내역이 없습니다.</p>
              <p className="flex items-center gap-2">
                <Link href={addSalePath}>
                  <Button>판매 입력</Button>
                </Link>
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
              {/* {sales.map((sale) => (
                <SalesListItem key={sale.id} sale={sale} />
              ))} */}
              {lastPage > 1 && <Pagination currentPage={page} lastPage={lastPage} />}
            </>
          )}
        </ul>
      </PageBody>
    </div>
  );
});
