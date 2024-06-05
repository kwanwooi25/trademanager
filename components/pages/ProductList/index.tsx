'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import ProductListItem from '@/components/pages/ProductList/ProductListItem';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { getProducts } from '@/services/product';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductListFilter from './ProductListFilter';
import ProductListHeader from './ProductListHeader';

export default function ProductListPage({ products, lastPage, totalCount }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const page = +(searchParams.get('page') || 1);

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString('page', `${page}`)}`);
  };

  const handleSearch = (input: string) => {
    router.push(`${pathname}?${createQueryString('search', `${input}`)}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title="상품 목록">
        <Link href={PATHS.ADD_PRODUCT}>
          <Button>상품 등록</Button>
        </Link>
      </PageHeader>
      <PageBody className={'flex flex-col gap-4'}>
        {!products.length ? (
          <div className="flex flex-col items-center py-16 gap-4">
            <p>등록된 상품이 없습니다.</p>
            <p>
              <Link href={PATHS.ADD_PRODUCT}>
                <Button>상품 등록</Button>
              </Link>{' '}
              버튼을 눌러 상품을 추가하세요.
            </p>
          </div>
        ) : (
          <>
            <ProductListFilter onSearch={handleSearch} totalCount={totalCount} />
            <ul className="flex flex-col">
              <ProductListHeader />
              {products.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </ul>
            {lastPage > 1 && (
              <Pagination currentPage={page} onChange={handlePageChange} lastPage={lastPage} />
            )}
          </>
        )}
      </PageBody>
    </div>
  );
}

type Props = Awaited<ReturnType<typeof getProducts>>;
