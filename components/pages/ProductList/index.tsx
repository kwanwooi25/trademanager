'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { getProducts } from '@/services/product';
import Link from 'next/link';
import ProductListFilter from './ListFilter';
import { useProductListFilter } from './ListFilter/useListFilter';
import ProductListHeader from './ListHeader';
import ProductListItem from './ListItem';

export default function ProductListPage({ products, lastPage }: Props) {
  const { page, search } = useProductListFilter();

  const currentUrl = useCurrentUrl();
  const addProductPath = `${PATHS.ADD_PRODUCT}?callbackUrl=${currentUrl}`;

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="상품 목록">
        <Link href={addProductPath}>
          <Button>상품 등록</Button>
        </Link>
      </PageHeader>
      <PageBody className={'flex flex-col gap-4'}>
        <ProductListFilter />
        <ul className="flex flex-col">
          <ProductListHeader />

          {!products.length && !search && (
            <div className="flex flex-col items-center py-16 gap-4">
              <p>등록된 상품이 없습니다.</p>
              <p className="flex items-center gap-2">
                <Link href={addProductPath}>
                  <Button>상품 등록</Button>
                </Link>
                <span>버튼을 눌러 상품을 추가하세요.</span>
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
              {products.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
              {lastPage > 1 && <Pagination currentPage={page} lastPage={lastPage} />}
            </>
          )}
        </ul>
      </PageBody>
    </div>
  );
}

type Props = Awaited<ReturnType<typeof getProducts>>;
