import ProductFormPage from '@/components/pages/ProductForm';
import { withAuth } from '@/lib/auth/hoc';
import { getProductById } from '@/services/product';

async function Page({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  return <ProductFormPage product={product} />;
}

export default withAuth(Page);
