import Container from "../ui/container"
import { Separator } from "../ui/separator"
import { useAppSelector } from "@/lib/store/hooks"

export default function TripsStats () {
        const {dispatcherCurrentTripsCount, dispatcherDeliveredTripsCount, dispatcherEarnings} = useAppSelector(state=>state.dispatcher)
    return (
        <Container className="flex w-full md:w-3/5 h-44 rounded-xl p-4 gap-2">
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-amber-500 dark:text-black font-medium h-6 rounded-md"><p>Active</p></span>
                        <p className="text-5xl font-bold">{dispatcherCurrentTripsCount || 0}</p>
                </div>
                <Separator orientation="vertical" className="dark:bg-slate-200 dark:opacity-10"/>
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-green-500 dark:text-black font-medium h-6 rounded-md"><p>Completed</p></span>
                        <p className="text-5xl font-bold">{dispatcherDeliveredTripsCount || 0}</p>
                </div>
                <Separator orientation="vertical" className="dark:bg-slate-200 dark:opacity-10"/>
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-teal-500 font-medium h-6 dark:text-black rounded-md"><p>Earnings</p></span>
                        <p className="text-5xl font-bold">¢{dispatcherEarnings || 0}</p>
                        
                </div>
            </Container>
    )
}