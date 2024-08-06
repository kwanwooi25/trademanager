import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductFormSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-2 py-4">
      <PageHeader title={<Skeleton className="h-7 w-20" />}>
        <Skeleton className="h-10 w-20" />
      </PageHeader>
      <PageBody className="flex flex-col gap-4">
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Input />
        <div className="pl-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-[26px] w-[70px]" />
            <Skeleton className="h-[36px] w-[78px]" />
          </div>
          <div className="relative p-4 pt-8 border border-accent rounded-md gap-4 grid grid-cols-[auto_1fr]">
            <Skeleton className="h-10 w-10 absolute top-0 right-0" />
            <Skeleton className="w-[100px] h-[100px]" />
            <div className="grid grid-cols-[1fr_1fr] gap-y-2 gap-x-4">
              <Skeleton.Input />
              <Skeleton.Input />
              <Skeleton.Input />
              <Skeleton.Input />
            </div>
          </div>
        </div>
      </PageBody>
    </div>
  );
}
