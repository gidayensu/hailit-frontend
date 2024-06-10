'use client'

import OrderHistory from "../Order/OrderHistory"
import OrderSummary from "../Order/OrderSummary"
import Container from "../ui/container"
import { Separator } from "../ui/separator"
import { useGetDispatcher } from "./hook/useGetDispatcher"
import DispatcherHead from "./DispatcherHead"
import { DispatcherTrip } from "../Order/hooks/useGetUserTrips"
import NoData from "../Shared/NoData"

export default function CourierDetail () {
    const {first_name, last_name, user_role, trips, currentTrips} = useGetDispatcher();
    return (
        <main className="p-3 w-full">
        <DispatcherHead firstName={first_name} lastName={last_name} userRole={user_role} />
            <Container className="flex w-full md:w-3/5 h-44 rounded-xl p-4 gap-2">
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-amber-500 dark:text-black font-medium h-6 rounded-md"><p>Active</p></span>
                        <p className="text-5xl font-bold">{trips?.current_trips || 0}</p>
                </div>
                <Separator orientation="vertical" className="dark:bg-slate-200 dark:opacity-10"/>
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-green-500 dark:text-black font-medium h-6 rounded-md"><p>Completed</p></span>
                        <p className="text-5xl font-bold">{trips?.delivered_trips || 0}</p>
                </div>
                <Separator orientation="vertical" className="dark:bg-slate-200 dark:opacity-10"/>
                <div className="flex flex-col items-center justify-center gap-3 w-1/3">
                        <span className="flex items-center justify-center text-[12px] w-full bg-teal-500 font-medium h-6 dark:text-black rounded-md"><p>Earnings</p></span>
                        <p className="text-5xl font-bold">¢{trips?.total_earnings}</p>
                        
                </div>
            </Container>
            <div className="w-full md:w-3/5 space-y-2 mt-4">
            <h2 className="font-bold text-xl text-center"> YOUR CURRENT DELIVERIES</h2>
                {
                    currentTrips && 
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    {
                        currentTrips.map((trip:DispatcherTrip)=> 
                            
                                <Container className="w-full p-2 rounded-lg"  key={trip.trip_id}>

                                    <OrderSummary trip={trip} key={trip.trip_id}/>
                                </Container>
                            
                        
                            
                    )
                    }
                    {!currentTrips && <NoData noDataText="You have no ongoing delivery"/>}
               </div>
                }
            </div>
            
        </main>
    )
}