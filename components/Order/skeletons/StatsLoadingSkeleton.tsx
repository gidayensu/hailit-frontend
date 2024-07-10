import { Skeleton } from "@/components/ui/skeleton";

export const StatsLoadingSkeleton = ()=> {
    return (
        <div className='flex gap-2 items-end justify-center'>
          <Skeleton className='w-8 h-16'/>
          <Skeleton className='w-8 h-20'/>
          <Skeleton className='w-8 h-24'/>
        </div>
    )
}