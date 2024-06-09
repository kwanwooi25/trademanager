import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';

export default function RegisterCompanySkeleton() {
  return (
    <PageBody className="w-full max-w-md mx-auto flex flex-col gap-4">
      <Skeleton.PageHeader />
      <div className="flex flex-col gap-2">
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton className="h-10 mt-4" />
      </div>
    </PageBody>
  );
}
