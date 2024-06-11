import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function PurchaseOrderFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-2 py-4">
      <PageHeader title={<Skeleton className="h-7 w-20" />}>
        <Skeleton className="h-10 w-20" />
      </PageHeader>
      <PageBody className="grid grid-cols-[1fr_160px_100px] items-center gap-4">
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
      </PageBody>
    </div>
  );
}
