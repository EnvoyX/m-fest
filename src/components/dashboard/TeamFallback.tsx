import { Skeleton } from "@/components/ui/skeleton";
import { IconUsersGroup } from "@tabler/icons-react"; // Assuming Tabler icons based on your code

export default function TeamFallback() {
    return (
        <div className="p-6 border-2 rounded-lg my-12 backdrop-glass-sm animate-pulse">
            <div className="flex items-center gap-3 mb-6">
                <IconUsersGroup className="w-6 h-6 text-primary/20" />
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-6 w-40" />
                        <div className="flex items-center gap-2 ml-2">
                            <Skeleton className="h-8 w-8 rounded-md" />{" "}
                            <Skeleton className="h-8 w-8 rounded-md" />{" "}
                        </div>
                    </div>
                    <Skeleton className="h-4 w-24" />
                </div>

                <div className="ml-auto flex flex-col-reverse gap-2 items-center justify-center">
                    <Skeleton className="h-6 w-20 rounded-full" />{" "}
                    <Skeleton className="h-6 w-24 rounded-full" />{" "}
                </div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="glass-sm p-4 flex flex-col items-center text-center border rounded-lg"
                    >
                        <Skeleton className="h-5 w-20 mb-2 rounded-full" />{" "}
                        {/* Verification Badge */}
                        <Skeleton className="w-24 h-24 rounded-full border-2 border-primary/20" />{" "}
                        {/* Avatar */}
                        <Skeleton className="h-4 w-28 mt-3" />{" "}
                        {/* Member Name */}
                        <Skeleton className="h-3 w-32 mt-2" />{" "}
                        {/* Institution */}
                        <Skeleton className="h-5 w-16 rounded-full mt-3" />{" "}
                        {/* Role Badge */}
                    </div>
                ))}
            </div>
        </div>
    );
}
