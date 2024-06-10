import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function PurchaseOrderFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-2 py-4">
      <PageHeader title={<Skeleton className="h-7 w-20" />}>
        <Skeleton className="h-10 w-20" />
      </PageHeader>
      <PageBody className="flex flex-col gap-4">
        <Skeleton.Input />
        <div className="grid grid-cols-[160px_1fr] items-center gap-4">
          <Skeleton.Input />
          <Skeleton.Input />
        </div>
        <div className="grid grid-cols-[160px_1fr] items-center gap-4">
          <Skeleton.Input />
          <Skeleton.Input />
        </div>
        <Skeleton.Input />
      </PageBody>
    </div>
  );
}
