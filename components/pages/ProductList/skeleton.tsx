import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductListSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <PageHeader title={<Skeleton className="h-7 w-20" />}>
        <Skeleton className="h-10 w-20" />
      </PageHeader>
      <PageBody className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[400px]" />
            <Skeleton className="h-10 w-10" />
          </div>
          <Skeleton className="h-7 w-24" />
        </div>

        <ul className="flex flex-col">
          <li className="px-4 py-6 grid items-center gap-4 grid-cols-[4fr_auto_2fr_1fr_1fr_1fr_1fr_1fr_40px] text-sm font-semibold border-y">
            <Skeleton className="h-5" />
            <span className="w-[60px]"></span>
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <span className="w-10"></span>
          </li>
          {Array(10)
            .fill('')
            .map((_, i) => (
              <li
                key={i}
                className="px-4 py-2 grid items-center gap-4 grid-cols-[4fr_auto_2fr_1fr_1fr_1fr_1fr_1fr_40px] border-b p-2"
              >
                <Skeleton className="h-7" />
                <Skeleton className="h-[60px] w-[60px]" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-10 w-10" />
              </li>
            ))}
        </ul>
      </PageBody>
    </div>
  );
}
