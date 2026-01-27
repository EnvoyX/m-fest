import { Skeleton } from "@/components/ui/skeleton";

export function AuthButtonsSkeleton() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      {/* Google Button Skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />

      {/* Discord Button Skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />

      {/* Github Button Skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
