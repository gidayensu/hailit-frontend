import { useGetUserTrips } from "../Order/hooks/useGetUserTrips";
import Container from "../ui/container";
import { Separator } from "../ui/separator";
import Loader from "../Shared/Loader";
export default function UserStats () {
    const { currentTrips, previousTrips, isLoading, error, noDelivery } = useGetUserTrips();
    return (
        <section className="md:w-4/6 w-full flex flex-col items-center justify-center">
                <p className="text-md  w-5/6 font-bold h-7 ">
          Your Order Stats
        </p>
        <Container className="flex  w-5/6 h-44 rounded-xl p-4 gap-2">
                <div className="flex flex-col items-center justify-center gap-3 w-1/2">
                        <span className="flex items-center justify-center text-[12px] w-full bg-amber-500 dark:text-black font-medium h-6 rounded-md"><p>Ongoing</p></span>
                        
                       {
                                 isLoading  && !error ? <Loader color="text-primary-color"/> : error ? <p className="text-red-500" >Error occurred</p> :
                        <p className="text-5xl font-bold">{currentTrips?.length || 0}</p>
                       }
                </div>
                <Separator orientation="vertical" className="dark:bg-slate-200 dark:opacity-10"/>
                <div className="flex flex-col items-center justify-center gap-3 w-1/2">
                        <span className="flex items-center justify-center text-[12px] w-full bg-green-500 dark:text-black font-medium h-6 rounded-md"><p>Completed</p></span>
                        {
                            isLoading ? <Loader color="text-primary-color"/> : error ? <p className="text-red-500">Error occurred</p> :
                        <p className="text-5xl font-bold">{previousTrips?.length || 0}</p>
                        }
                </div>
                
            </Container>
        </section>
    )
}