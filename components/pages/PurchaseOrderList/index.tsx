'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PurchaseOrderListPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();

  const currentUrl = `${pathname}?${searchParams.toString()}`;

  const addPurchaseOrderPath = `${PATHS.ADD_PURCHASE_ORDER}?${createQueryString(
    'callbackUrl',
    currentUrl,
  )}`;

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="구매 목록">
        <Link href={addPurchaseOrderPath}>
          <Button>구매 입력</Button>
        </Link>
      </PageHeader>
      <PageBody className={'flex flex-col gap-4'}>
        구매 목록 페이지
        {/* {(!!products.length || !!search) && (
          <ProductListFilter search={search} onSearch={handleSearch} totalCount={totalCount} />
        )}

        {!products.length && !search && (
          <div className="flex flex-col items-center py-16 gap-4">
            <p>등록된 상품이 없습니다.</p>
            <p>
              <Link href={addPurchaseOrderPath}>
                <Button>상품 등록</Button>
              </Link>{' '}
              버튼을 눌러 상품을 추가하세요.
            </p>
          </div>
        )}

        {!products.length && !!search && (
          <div className="flex flex-col items-center py-16 gap-4">
            <p>검색된 상품이 없습니다.</p>
          </div>
        )}

        {!!products.length && (
          <>
            <ul className="flex flex-col">
              <ProductListHeader />
              {products.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onProductEdit={handleProductEdit}
                  onOptionDelete={handleOptionDelete(product.id)}
                />
              ))}
            </ul>
            {lastPage > 1 && (
              <Pagination currentPage={page} onChange={handlePageChange} lastPage={lastPage} />
            )}
          </>
        )} */}
      </PageBody>
    </div>
  );
}
