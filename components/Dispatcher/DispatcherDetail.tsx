'use client'

import OrderHistory from "../Order/OrderHistory"
import OrderSummary from "../Order/OrderSummary"
import Container from "../ui/container"
import { Separator } from "../ui/separator"
import { useGetDispatcher } from "./hook/useGetDispatcher"
import TripsStats from "./TripsStats"
import { DispatcherTrip } from "../Order/hooks/useGetUserTrips"
import NoData from "../Shared/NoData"
import Link from "next/link"

export default function CourierDetail () {
    const { trips, dispatcher} = useGetDispatcher();
    return (
        <main className="p-3 w-full flex flex-col items-center justify-center">
        
            <TripsStats />
            <div className="w-full md:w-3/5 space-y-2 mt-4">
            <h2 className="font-bold text-xl text-center"> YOUR CURRENT DELIVERIES</h2>
                {
                    dispatcher.dispatcherCurrentTrips.length > 0  && 
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                    {
                        dispatcher.dispatcherCurrentTrips.map((trip:DispatcherTrip)=> 
                            <Link className="w-full cursor-pointer" href={`/dispatcher/trips/${trip.trip_id}` }key={trip.trip_id}>
                                <Container className="w-full p-2 rounded-lg "  key={trip.trip_id}>

                                    <OrderSummary trip={trip} key={trip.trip_id}/>
                                </Container>
                            </Link>
                            
                        
                            
                    )
                    }
               </div>
                }
            {dispatcher.dispatcherCurrentTrips.length < 1  && <NoData noDataText="You have no ongoing delivery"/>}
            </div>
            
        </main>
    )
}