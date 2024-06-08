import { Skeleton } from "@/components/ui/skeleton";

export default function TripsLoadingSkeleton () {
    return (
      <div className="flex flex-col md:w-4/6 w-full mt-4 rounded-2xl gap-2 items-center justify-center">
        <div className="flex flex-col md:w-5/6 w-full items-center justify-center gap-2 md:items-start md:p-3">
          <div className="w-full">
            <Skeleton className="flex  h-16 rounded-xl" />
          </div>
          <div className="w-full">
            <Skeleton className="flex  h-16 rounded-xl" />
          </div>
          <div className="w-full">
            <Skeleton className="flex  h-16 rounded-xl" />
          </div>
        </div>
      </div>
    );
  };