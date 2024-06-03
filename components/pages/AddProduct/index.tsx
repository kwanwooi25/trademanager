import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';

export default function AddProductPage() {
  return (
    <div className="max-w-3xl mx-auto px-2 py-4">
      <PageHeader title="상품 등록" backButton />
      <PageBody>상품 등록 페이지</PageBody>
    </div>
  );
}
