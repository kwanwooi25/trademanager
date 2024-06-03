import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import Link from 'next/link';

export default function ProductListPage() {
  return (
    <div className="max-w-7xl mx-auto px-2 py-4">
      <PageHeader title="상품 목록">
        <Link href={PATHS.ADD_PRODUCT}>
          <Button>상품 등록</Button>
        </Link>
      </PageHeader>
      <PageBody>상품 목록 페이지</PageBody>
    </div>
  );
}
