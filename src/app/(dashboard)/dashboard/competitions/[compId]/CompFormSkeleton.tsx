import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function SubmissionSkeleton() {
    return (
        <section className="min-h-screen bg-transparent w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="p-6 flex flex-col sm:flex-row gap-8">
                <div className="flex-1 border-r-0 sm:border-r p-4 pr-8">
                    <Skeleton className="h-10 w-[70%] mb-4" />

                    <Skeleton className="h-5 w-[40%] mb-6" />

                    <Separator orientation="horizontal" />

                    <div className="mt-6 mb-6 space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[90%]" />
                            <Skeleton className="h-4 w-[95%]" />
                        </div>

                        <div className="space-y-2 pt-4">
                            <Skeleton className="h-4 w-[50%]" />
                            <Skeleton className="h-4 w-[60%]" />
                        </div>

                        <div className="pt-4">
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-10 w-40 rounded-md" />
                        </div>

                        <div className="pt-4">
                            <Skeleton className="h-6 w-[80%] bg-red-100/20" />
                        </div>

                        <div className="mt-6 flex justify-center sm:justify-start">
                            <Skeleton className="h-32 w-full max-w-sm rounded-xl" />
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-[400px] p-6">
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-32 mx-auto sm:mx-0" />
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-md" />
                    </div>
                </div>
            </div>
        </section>
    );
}
