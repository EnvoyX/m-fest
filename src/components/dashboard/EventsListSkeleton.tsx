import { Skeleton } from "@/components/ui/skeleton";

export const RegisteredEventsListSkeleton = () => {
  return (
    <div className="glass p-6">
      {/* Card Title Placeholder */}
      <Skeleton className="h-7 w-40 mb-6" />

      <div className="space-y-4">
        {/* render 2-3 skeleton items to create a list */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="glass-sm p-4 rounded-lg border border-border/50"
          >
            {/* Header: Title and Badge */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <Skeleton className="h-5 w-[60%] shrink-0" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            {/* Info Lines */}
            <div className="space-y-3">
              {/* Date Line */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-sm" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Location Line */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-sm" />
                <Skeleton className="h-4 w-48" />
              </div>

              {/* Participants Line */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-sm" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
