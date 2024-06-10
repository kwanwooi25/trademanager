import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import ProductListFilter from '@/components/pages/ProductList/ListFilter';
import ProductListHeader from '@/components/pages/ProductList/ListHeader';
import ProductListItem from '@/components/pages/ProductList/ListItem';
import { Button } from '@/components/ui/button';
import { DEFAULT_PER } from '@/const/api';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { getUrl } from '@/lib/url';
import { getProducts } from '@/services/product';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default withAuth(async () => {
  const { pathname, search: urlSearch, searchParams } = getUrl();
  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';

  const currentUrl = `${pathname}${urlSearch}`;
  const addProductPath = `${PATHS.ADD_PRODUCT}?callbackUrl=${currentUrl}`;

  const { products, lastPage } = await getProducts({ page, per, search });

  if (page > 1 && !products.length) {
    return redirect(PATHS.PRODUCT_LIST);
  }

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
              <p>
                <Link href={addProductPath}>
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
});
