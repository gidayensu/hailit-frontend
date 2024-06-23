import Container from "../ui/container"
import { Separator } from "../ui/separator"
import { useAppSelector } from "@/lib/store/hooks"
import { useGetDispatcher } from "./hook/useGetDispatcher"
import Loader from "../Shared/Loader"
export default function TripsStats () {
        const {dispatcherCurrentTripsCount, dispatcherDeliveredTripsCount, dispatcherEarnings} = useAppSelector(state=>state.dispatcher)
        const {isLoading} = useGetDispatcher();
    return (
        <main className="flex flex-col items-start justify-start md:items-center md:justify-center w-full">
        <div className="md:w-1/2 lg:w-2/5 w-full">
                
        <p className="text-xl font-semibold mb-2">Earnings</p>
        <Container className="w-full flex items-center justify-center h-32 rounded-xl mb-8">
        <div className="flex flex-col items-center justify-center gap-3 w-1/2">
                        <span className="flex items-center justify-center text-[12px] w-full bg-teal-500 font-medium h-6 dark:text-black rounded-md"><p>Your Earnings</p></span>
                        <p className="text-5xl font-bold">¢{isLoading ? <Loader color="primary"/> : (dispatcherEarnings || 0)}</p>
                        
                </div>
        </Container>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/5">

        <p className="text-xl font-semibold mb-2">Delivery counts</p>
        <Container className="flex w-full h-36 rounded-xl p-4 gap-2">
                <div className="flex flex-col items-center justify-center gap-3 w-1/2">
                        <span className="flex items-center justify-center text-[12px] w-full bg-amber-500 dark:text-black font-medium h-6 rounded-md"><p>Active</p></span>
                        <p className="text-5xl font-bold">
                                {isLoading ? <Loader color="primary"/> : (dispatcherCurrentTripsCount || 0)}
                                
                                </p>
                </div>
                <div>

                      <Separator orientation="vertical" className="dark:bg-slate-200 dark:opacity-10"/>
                
                </div>
                <div className="flex flex-col items-center justify-center gap-3 w-1/2">
                        <span className="flex items-center justify-center text-[12px] w-full bg-green-500 dark:text-black font-medium h-6 rounded-md"><p>Completed</p></span>
                        <p className="text-5xl font-bold">{isLoading ? <Loader color="primary"/> : (dispatcherDeliveredTripsCount || 0)}</p>
                </div>
                
                
            </Container>
        </div>
        </main>
    )
}