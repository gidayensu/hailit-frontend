import { Skeleton } from "@/components/ui/skeleton";

export const StatsLoadingSkeleton = ()=> {
    return (
        <div className='flex gap-2 items-end justify-center'>
          <Skeleton className='w-6 h-10 md:w-8 md:h-16'/>
          <Skeleton className='w-6 md:w-8 h-14 md:h-20'/>
          <Skeleton className='w-6 md:w-8 h-20 md:h-24'/>
        </div>
    )
}