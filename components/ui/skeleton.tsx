import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

function InputSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      <Skeleton className="h-5 w-10" />
      <Skeleton className="h-10 w-full mt-2" />
    </div>
  );
}

Skeleton.Input = InputSkeleton;

export { Skeleton };
