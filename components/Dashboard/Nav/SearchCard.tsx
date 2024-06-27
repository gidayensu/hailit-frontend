import Loader from "@/components/Shared/Loader";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Trip } from "@/lib/store/slice/tripSlice";

import { extractShortDate } from "@/lib/utils";
import { forwardRef } from "react";

interface SearchCardProps {
  trips: Trip[];
  isLoading: boolean;
  error: any;
  handleSelectedTrip: (selectedTripId: string) => void;
  
}


const SearchCard = forwardRef<HTMLDivElement, SearchCardProps> (({trips, isLoading, error, handleSelectedTrip}, ref) => {         
    
    return (
        <Container className="-ml-4 md:-ml-24 absolute w-72 md:w-[800px] text-[13px] max-h-80 z-10 mt-3 rounded-xl p-4 flex flex-col items-center gap-2" ref= {ref}>
          {isLoading && <Loader color="primary" /> } 
          {
              error  &&
              <p>
                Error occurred.
              </p>
          }
          {
              !isLoading && trips && trips.length <= 0 &&
              <p>
                No trip ID matched your search
              </p>
          }
          {
            !isLoading && trips && trips?.length > 0 && trips.map((trip: Trip) => (
                <div key={trip?.trip_id} className="w-full cursor-pointer" onClick={()=>handleSelectedTrip(trip?.trip_id)}>
                    <div className="w-full grid grid-cols-3 md:grid-cols-6 items-center justify-center gap-2">
                      <p>#{trip?.trip_id}</p>
                      <p>{trip?.trip_area}</p>
                      <div className="hidden col-span-3 md:grid md:grid-cols-3 gap-3">
                        <p>{extractShortDate(`${trip?.trip_request_date}`)}</p>
                        <p>{trip?.sender_number}</p>
                        <p>{trip?.trip_medium}</p>
                      </div>
                      <span className={`h-6 flex items-center justify-center w-20 rounded-lg ${
                          trip?.trip_status === "Delivered"
                          ? "bg-green-500"
                          : trip?.trip_status === "Picked Up"
                          ? "bg-sky-600"
                          : trip?.trip_status === "In Transit"
                          ? "bg-amber-500"
                          : trip?.trip_status === "Booked"
                          ? "bg-slate-600 dark:text-slate-50"
                          : "bg-red-500"
                        }`}>  
                        {trip?.trip_status}
                      </span>
                    </div>
                    <Separator className="w-full mt-2" />
                </div>
            ))
          }
        </Container>
    )
})

export default SearchCard