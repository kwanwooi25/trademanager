import ProductListPage from '@/components/pages/ProductList';
import { withAuth } from '@/lib/auth/hoc';
import { getUrl } from '@/lib/url';
import { DEFAULT_PER } from '@/const/api';
import { getProducts } from '@/services/product';
import { redirect } from 'next/navigation';
import { PATHS } from '@/const/paths';

export default withAuth(async () => {
  const { searchParams } = getUrl();
  const page = +(searchParams.get('page') ?? 1);
  const per = +(searchParams.get('per') ?? DEFAULT_PER);
  const search = searchParams.get('search') ?? '';
  
  const res = await getProducts({ page, per, search });
  
  if (page > 1 && !res.products.length) {
    return redirect(PATHS.PRODUCT_LIST);
  }
  
  return (
    <ProductListPage {...res}/>
  );
});
