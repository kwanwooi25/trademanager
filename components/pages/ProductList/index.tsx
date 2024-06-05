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

export default function ProductListPage({ products, lastPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const page = +(searchParams.get('page') || 1);

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString('page', `${page}`)}`);
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
            <ul className="flex flex-col border-t">
              <li className="px-4 py-6 grid items-center gap-4 grid-cols-[2fr_auto_2fr_1fr_1fr_1fr_1fr_60px] text-sm font-semibold border-b">
                <span>상품명</span>
                <span className="w-[60px]"></span>
                <span>옵션명</span>
                <span className="text-right">단가</span>
                <span className="text-right">재고수량</span>
                <span className="text-right">입고소요일</span>
                <span className="text-right">보관 위치</span>
                <span className="w-[40px]"></span>
              </li>
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
