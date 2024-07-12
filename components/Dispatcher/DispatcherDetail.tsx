'use client'
import Link from "next/link"
import { DispatcherTrip } from "../Order/hooks/useGetUserTrips"
import OrderSummary from "../Order/OrderSummary"
import NoData from "../Shared/NoData"
import Container from "../ui/container"
import { useGetDispatcher } from "./hook/useGetDispatcher"
import TripsStats from "./TripsStats"

export default function CourierDetail () {
    const { handleDispatcherTripId, dispatcher} = useGetDispatcher();
    return (
      <main className="p-3 w-full flex flex-col items-center justify-center mb-20 md:mb-0">
        <TripsStats />
        <div className="w-full md:w-1/2 lg:w-2/5  space-y-2 mt-4">
          <h2 className="font-bold text-xl">
            
            Your assigned deliveries
          </h2>
          {dispatcher.dispatcherCurrentTrips.length > 0 && (
            <div className="w-full flex flex-col items-center justify-center gap-4">
              {dispatcher.dispatcherCurrentTrips.map((trip: DispatcherTrip) => (
                <Link
                  className="w-full cursor-pointer"
                  href={`/dispatcher/trips/${trip?.trip_id}`}
                  key={trip?.trip_id}
                  onClick={()=>handleDispatcherTripId(trip?.trip_id)}
                >
                  <Container
                    className="w-full rounded-lg "
                    key={trip?.trip_id}
                  >
                    <OrderSummary trip={trip} key={trip?.trip_id} />
                  </Container>
                </Link>
              ))}
            </div>
          )}
          {dispatcher.dispatcherCurrentTrips.length < 1 && (
            <NoData noDataText="You have no ongoing delivery" />
          )}
        </div>
      </main>
    );
}